import { GetArticlesDto } from './dto/getArticles.dto';
import { Inject, Injectable } from '@nestjs/common';
import { GetArticleDto } from './dto/getArticle.dto';
import { ArticleRepo } from './article.repo';
import { ArticleEntity } from './entity/article.entity';
import { instantiate } from '../../common/entity/instantiate';
import { CreateArticleDto } from './dto/createArticle.dto';
import { Pagination } from '../../common/interfaces/pagination.interface';
import { Context } from '../../common/context/context';

@Injectable()
export class ArticleService {
  @Inject()
  articleRepo: ArticleRepo;

  @Inject()
  context: Context;

  async getOne(getArticleDto: GetArticleDto): Promise<ArticleEntity> {
    const articleItem = await this.articleRepo.getOne(getArticleDto);
    return instantiate(articleItem, ArticleEntity);
  }

  async createOne(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const articleItem = await this.articleRepo.createOne(createArticleDto);
    return instantiate(articleItem, ArticleEntity);
  }

  async getMany(
    getArticlesDto: GetArticlesDto,
  ): Promise<Pagination<ArticleEntity>> {
    const { items, lastKey } = await this.articleRepo.getMany(getArticlesDto);
    return {
      results: items.map((item) => instantiate(item, ArticleEntity)),
      lastKey: lastKey,
      limit: getArticlesDto.limit,
    };
  }
}
