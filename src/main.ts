import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({ origin: '*', credentials: true });
  }

  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
