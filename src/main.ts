import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  const { APP_PORT } = process.env;
  await app.listen(Number(APP_PORT));
}
bootstrap();
