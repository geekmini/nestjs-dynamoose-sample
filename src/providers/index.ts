import { configModule } from './config';
import { ContextModule } from './context/context.module';

import { dynamooseModule } from './dynamoose';

export const globalModules = [configModule, dynamooseModule, ContextModule];
