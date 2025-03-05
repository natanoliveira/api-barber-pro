// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as moment from 'moment-timezone';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const appPort = process.env.SERVER_PORT || 8081;
  const company = process.env.NOME_EMPRESA || 'NST';

  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: ['Authorization'],
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const baseUrls = [
    {
      url: process.env.BASE_URL || `http://localhost:${appPort}`,
      description: 'Local server',
    },
    {
      url: process.env.BASE_URL || `http://localhost:${appPort}`,
      description: 'Production server',
    },
  ];

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Barber')
    .setDescription('The NST API description')
    .setVersion('1.0')
    .addTag('Natan Sousa Tech')
    .build();

  // Adicionando múltiplos servidores
  config.servers = baseUrls.map((baseUrl) => ({
    url: baseUrl.url,
    description: baseUrl.description,
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document, {
    explorer: true,
  });

  app.use(
    morgan((tokens, req, res) => {
      const dateTime = moment()
        .tz(process.env.TIMEZONE || 'America/Sao_Paulo')
        .format('DD/MM/YYYY HH:mm:ss');

      tokens['date'] = dateTime;

      return [
        '[REQ Front-barber-pro]',
        tokens.date,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' ');
    }),
  );

  await app.listen(appPort, async () => {
    const logger = new Logger();
    // logger.log(`
    //   \n +============================================================+`,);
    // logger.log(`Servidor iniciado em http://localhost:${appPort}`);
    // logger.log(`Port: ${appPort}`);
    // logger.log(`\n +============================================================+
    //   `,);
    logger.log(`\n+-------------------------------------------------------------------------------------+
  📜  ${company}
  🚀  Servidor rodando com sucesso!
  📡  API disponível em: http://localhost:${appPort}
  🕒  Hora de iniciar os testes!
+-------------------------------------------------------------------------------------+`);
  });
}
bootstrap();
