import { ConfigService } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';
import { EnvironmentVariables } from '../config/envs';

export const dynamooseModule = DynamooseModule.forRootAsync({
  useFactory: (config: ConfigService<EnvironmentVariables, true>) => {
    return {
      local: config.get<boolean>('IS_OFFLINE')
        ? config.get<string>('DYNAMO_ENDPOINT')
        : false, // it will read from aws env in online env
      table: { create: false },
    };
  },
  inject: [ConfigService],
});
