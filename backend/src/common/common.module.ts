import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../infra/prisma.service';
import { usarMemoria } from '../infra/persistencia';
import { Relogio } from './relogio';

@Global()
@Module({
  providers: [
    Relogio,
    // Sem banco quando PERSISTENCIA=memoria: o Prisma nem é instanciado.
    { provide: PrismaService, useFactory: () => (usarMemoria() ? null : new PrismaService()) },
  ],
  exports: [Relogio, PrismaService],
})
export class CommonModule {}
