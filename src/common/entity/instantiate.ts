import { InternalServerErrorException, Type } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { ValidatorOptions, validateSync } from 'class-validator';

import { flattenValidationErrors } from '../validation/flattenValidationErrors';
import { toEmptyIfNil } from '../utils/toEmptyIfNil.util';
import { toNullIfEmpty } from '../utils/toNullIfEmpty.util';

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
