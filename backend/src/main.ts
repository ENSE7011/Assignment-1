import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://assign-1-frontend-preview.vercel.app/',
    credentials: true,
  });
  app.use(bodyParser.json());
  const port = process.env.PORT || 8082;
  await app.listen(port, () => console.log(`server running on port ${port}`));
}
bootstrap();
