import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { derive } from './derive';
import { EnvironmentVariables } from './envs';
import { Logger } from '@nestjs/common';

// derive, transform to instance and validate
export const validate = (
  rawEnv: Record<string, unknown>,
): Record<keyof EnvironmentVariables, any> => {
  // generate default value and derivation
  Logger.log(
    'deriving environment variables from env files and runtime...',
    'config.validate',
  );
  const config = derive(rawEnv);

  // transform
  // * transform to defined type automatically
  // * exclude unnecessary values for memory
  Logger.log(
    'transforming environment variables to EnvironmentVariables instance...',
    'config.validate',
  );
  const configInstance = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // validate
  Logger.log('validating EnvironmentVariables...', 'config.validate');
  const errors = validateSync(configInstance, { enableDebugMessages: true });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return configInstance;
};
