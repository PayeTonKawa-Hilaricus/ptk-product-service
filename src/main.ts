import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 1. Création de l'app classique (HTTP)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // --- CONFIGURATION SWAGGER (Partie HTTP) ---
  const config = new DocumentBuilder()
    .setTitle('Product Service API')
    .setDescription('Gestion des produits et stocks')
    .setVersion('1.0')
    .addTag('products')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // ------------------------------------------

  // 2. Connexion au Microservice (RabbitMQ)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'orders_queue', // IMPORTANT : Le même nom que dans Order Service
      queueOptions: {
        durable: true,
      },
    },
  });

  // 3. On démarre tout (HTTP + Microservice)
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
