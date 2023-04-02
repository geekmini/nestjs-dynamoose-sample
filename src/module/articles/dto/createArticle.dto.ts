import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MaxLength(200)
  @Expose()
  title: string;

  @IsString()
  @MaxLength(5000)
  @Expose()
  body: string;
}
