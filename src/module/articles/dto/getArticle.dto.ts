import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

// Don't add any method to the class, it's a pure data interface
export class GetArticleDto {
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  slug: string;
}
