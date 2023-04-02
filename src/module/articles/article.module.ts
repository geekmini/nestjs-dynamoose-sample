import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleRepo } from './article.repo';
import { ArticleService } from './article.service';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ArticleSchema } from './dao/article.schema';

@Module({
  imports: [
    // https://github.com/hardyscc/nestjs-dynamoose/issues/822
    DynamooseModule.forFeature([
      {
        name: process.env.DYNAMODB_ARTICLE_TABLE_NAME,
        schema: ArticleSchema,
      },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleController, ArticleService, ArticleRepo],
})
export class ArticleModule {}
