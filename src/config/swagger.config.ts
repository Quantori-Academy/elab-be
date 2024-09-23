import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

export const setupSwagger = (app: INestApplication): void => {
  const logger = new Logger('SetupSwagger');
  const config = new DocumentBuilder()
    .setTitle('E-LAB API')
    .setDescription('API documentation for front-end developers')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/swagger', app, document);
  logger.log('Swagger setup complete: Access it at /api/v1/swagger');
};
