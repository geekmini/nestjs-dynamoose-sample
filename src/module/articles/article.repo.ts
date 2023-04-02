import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import {
  ArticleItem,
  ArticleItemKey,
  ICreateArticleItem,
  IGetArticleItem,
  IGetArticleItems,
} from './dao/article.interface';
import { v4 } from 'uuid';
import { omit } from 'lodash';

@Injectable()
export class ArticleRepo {
  @InjectModel(process.env.DYNAMODB_ARTICLE_TABLE_NAME)
  private readonly model: Model<ArticleItem, ArticleItemKey>;

  async getOne(filter: IGetArticleItem): Promise<ArticleItem> {
    return this.model.get(filter);
  }

  async createOne(toCreate: ICreateArticleItem): Promise<ArticleItem> {
    const currTime = new Date();
    const slug = v4();
    const data: ArticleItem = {
      slug,
      title: toCreate.title,
      body: toCreate.body,
      likes: 0,
      tags: [],
      createdAt: currTime,
      updatedAt: currTime,
    };

    // return date object is in * number * format
    await this.model.create(data);
    return data;
  }

  async getMany(filter: IGetArticleItems) {
    const scanResult = await this.model
      .scan()
      .startAt(filter.lastKey ? { slug: filter.lastKey } : null)
      .limit(filter.limit)
      .exec();

    const articleItems = Object.values(
      omit(scanResult, [
        'lastKey',
        'scannedCount',
        'count',
        'timesScanned',
        'populate',
        'toJSON',
      ]),
    ) as ArticleItem[];

    return {
      items: articleItems ?? [],
      lastKey: scanResult.lastKey?.slug ?? null,
    };
  }
}
