import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: false, credentials: false });
  app.use(bodyParser.json());
  const port = process.env.PORT || 8082;
  await app.listen(port, () => console.log(`server running on port ${port}`));
}
bootstrap();
