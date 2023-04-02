import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsUUID, Max } from 'class-validator';

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum SORT_BY {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  LIKES = 'LIKES',
}

export class GetArticlesDto {
  @IsOptional()
  @IsUUID()
  @Expose()
  lastKey?: string;

  @Transform(({ value }) => value ?? 10)
  @IsOptional()
  @IsNumber()
  @Max(100)
  @Expose()
  limit: number;

  @Transform(({ value }) => value ?? SORT_ORDER.ASC)
  @IsEnum(SORT_ORDER)
  @Expose()
  sortOrder: SORT_ORDER;

  @Transform(({ value }) => value ?? SORT_BY.CREATED_AT)
  @IsEnum(SORT_BY)
  @Expose()
  sortBy: SORT_BY;
}
