import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUppercase,
  ValidateIf,
} from 'class-validator';
import { STAGE } from './enum';

/**
 * ! only used for validation, don't provide default value or derivation
 */
export class EnvironmentVariables {
  // * ========================================== application ==============================================
  @IsNotEmpty()
  @IsEnum(STAGE)
  @IsUppercase()
  STAGE: string;

  @IsNotEmpty()
  @IsBoolean()
  IS_LOCAL: boolean;

  @IsNotEmpty()
  @IsBoolean()
  IS_TEST: boolean;

  @IsNotEmpty()
  @IsBoolean()
  IS_QA: boolean;

  @IsNotEmpty()
  @IsBoolean()
  IS_PRODUCTION: boolean;

  @IsNotEmpty()
  @IsBoolean()
  IS_OFFLINE: boolean;

  @IsNotEmpty()
  @IsBoolean()
  IS_ONLINE: boolean;

  @IsNumber()
  @IsNotEmpty()
  SERVICE_PORT: number;

  @IsNotEmpty()
  @IsString()
  SERVICE_NAME: string;

  // * ========================================== dynamodb ==============================================
  @ValidateIf((obj: EnvironmentVariables) => obj.IS_OFFLINE)
  @IsNotEmpty()
  @IsString()
  DYNAMO_ENDPOINT: string;

  @IsNotEmpty()
  @IsString()
  DYNAMODB_ARTICLE_TABLE_NAME: string;
}
