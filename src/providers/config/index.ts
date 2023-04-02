import { ConfigModule } from '@nestjs/config';
import { validate } from './validate';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.local'], // priority: .env.local > runtime env
  validate, // validate happens before load (below)
  // load: () => {}, // ! don't use this load function cause we don't need env grouping feature
});

export const configModuleForTestingEnv = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.test', '.env.local'], // priority: .env.test > .env.local > runtime env
  validate, // validate happens before load (below)
  // load: () => {}, // ! don't use this load function cause we don't need env grouping feature
});
