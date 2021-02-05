import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });
  app.setViewEngine('ejs');

  const config = new DocumentBuilder()
    .setTitle('RPA API Boilerplate')
    .setDescription('API Reference for RPA Boilerplate')
    .setVersion('0.0.4')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api_v1', app, document);

  const { APP_PORT } = process.env;
  await app.listen(Number(APP_PORT));
}
bootstrap();
