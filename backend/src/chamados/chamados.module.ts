import { Module } from '@nestjs/common';
import { EquipamentosModule } from '../equipamentos/equipamentos.module';
import { usarMemoria } from '../infra/persistencia';
import { ChamadoRepository } from './chamado.repository';
import { ChamadosController } from './chamados.controller';
import { ChamadosService } from './chamados.service';
import { MemoriaChamadoRepository } from './memoria-chamado.repository';
import { PrismaChamadoRepository } from './prisma-chamado.repository';

@Module({
  imports: [EquipamentosModule],
  controllers: [ChamadosController],
  providers: [
    ChamadosService,
    { provide: ChamadoRepository, useClass: usarMemoria() ? MemoriaChamadoRepository : PrismaChamadoRepository },
  ],
  exports: [ChamadoRepository, ChamadosService],
})
export class ChamadosModule {}
