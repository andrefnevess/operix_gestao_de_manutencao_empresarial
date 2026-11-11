import { Module } from '@nestjs/common';
import { usarMemoria } from '../infra/persistencia';
import { EquipamentoRepository } from './equipamento.repository';
import { EquipamentosController } from './equipamentos.controller';
import { EquipamentosService } from './equipamentos.service';
import { MemoriaEquipamentoRepository } from './memoria-equipamento.repository';
import { PrismaEquipamentoRepository } from './prisma-equipamento.repository';

@Module({
  controllers: [EquipamentosController],
  providers: [
    EquipamentosService,
    { provide: EquipamentoRepository, useClass: usarMemoria() ? MemoriaEquipamentoRepository : PrismaEquipamentoRepository },
  ],
  exports: [EquipamentoRepository, EquipamentosService],
})
export class EquipamentosModule {}
