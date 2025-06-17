import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // Importação necessária

async function bootstrap() {
  // Especificamos que estamos usando Express como plataforma
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração do ValidationPipe global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configuração para servir arquivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Define o prefixo para as URLs
  });

  // Configuração do CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Produtos')
    .setDescription('Sistema de gerenciamento de produtos')
    .setVersion('1.0')
    .addBearerAuth() // Se usar autenticação
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Inicia a aplicação
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();