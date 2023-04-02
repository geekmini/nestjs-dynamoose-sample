import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetArticleDto } from './dto/getArticle.dto';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entity/article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { GetArticlesDto } from './dto/getArticles.dto';
import { Pagination } from '../../common/interfaces/pagination.interface';

@Controller('articles')
export class ArticleController {
  @Inject()
  articleService: ArticleService;

  @Get(':slug')
  async getArticle(
    @Param() getArticleDto: GetArticleDto,
  ): Promise<ArticleEntity> {
    return this.articleService.getOne(getArticleDto);
  }

  @Post()
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    return this.articleService.createOne(createArticleDto);
  }

  @Get()
  async getArticles(
    @Query() getArticlesDto: GetArticlesDto,
  ): Promise<Pagination<ArticleEntity>> {
    return this.articleService.getMany(getArticlesDto);
  }
}
