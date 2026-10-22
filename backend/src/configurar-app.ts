import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrosFilter } from './common/erros.filter';

/** Configuração compartilhada entre a aplicação real e os testes de API. */
export function configurarApp(app: INestApplication): INestApplication {
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new ErrosFilter());

  const config = new DocumentBuilder()
    .setTitle('Operix API')
    .setDescription('API do Operix — Gestão de Manutenção Empresarial (projeto de POO, UNDB).')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));
  return app;
}
