import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './providers/config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  const config = app.get(ConfigService<EnvironmentVariables>);

  // enable transformation and validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        // query string convert to number automatically
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(config.get<number>('SERVICE_PORT'), async () => {
    Logger.log(
      `🚀 ${config.get(
        'SERVICE_NAME',
      )} service is listening at ${await app.getUrl()} ...`,
      'bootstrap',
    );
  });
}
bootstrap();
