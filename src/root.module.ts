import { Module } from '@nestjs/common';
import { globalModules } from './providers';
import { ArticleModule } from './module/articles/article.module';

@Module({
  imports: [...globalModules, ArticleModule],
})
export class RootModule {}
