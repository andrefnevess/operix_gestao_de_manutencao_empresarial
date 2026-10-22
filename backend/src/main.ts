import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configurarApp } from './configurar-app';

async function iniciar(): Promise<void> {
  const app = configurarApp(await NestFactory.create(AppModule));
  const porta = Number(process.env.PORT ?? 3000);
  await app.listen(porta);
  console.log(`Operix API em http://localhost:${porta}/api — documentação em http://localhost:${porta}/api/docs`);
}

iniciar();
