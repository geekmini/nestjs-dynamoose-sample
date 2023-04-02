import { InternalServerErrorException, Type } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ValidatorOptions, validateSync } from 'class-validator';
import { isEmpty } from 'lodash';
import { flattenValidationErrors } from '../validation/flattenValidationErrors';

const toEmptyIfNil = (value: any) => {
  if (value === null || value === undefined) {
    return {};
  }
  return value;
};

const toNullIfEmpty = <T extends object = any>(value: T) => {
  if (isEmpty(value)) {
    return null;
  }
  return value;
};

export interface InstantiatePipeOptions extends ValidatorOptions {
  validate?: boolean;
  transformOptions?: ClassTransformOptions;
}

export const instantiate = <T extends object = any>(
  value: any,
  metatype: Type<T>, // The class
  options?: InstantiatePipeOptions,
) => {
  options = options || {};
  const {
    validate = false,
    transformOptions,
    ...originalValidatorOptions
  } = options;

  // nil, undefined will be converted to {}
  value = toEmptyIfNil(value);

  // transformation
  const entity = plainToInstance<T, any>(metatype, value, transformOptions);

  if (validate) {
    const validatorOptions = {
      forbidUnknownValues: false,
      ...originalValidatorOptions,
    };

    const errors = validateSync(entity, validatorOptions);
    if (errors.length > 0) {
      throw new InternalServerErrorException(flattenValidationErrors(errors));
    }
  }

  return toNullIfEmpty<T>(entity);
};
