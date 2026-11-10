import { Module } from '@nestjs/common';
import { EquipamentosModule } from '../equipamentos/equipamentos.module';
import { ChamadoRepository } from './chamado.repository';
import { ChamadosController } from './chamados.controller';
import { ChamadosService } from './chamados.service';
import { MemoriaChamadoRepository } from './memoria-chamado.repository';

@Module({
imports: [EquipamentosModule],
controllers: [ChamadosController],
providers: [
ChamadosService,
{ provide: ChamadoRepository, useClass: MemoriaChamadoRepository },
],
exports: [ChamadoRepository, ChamadosService],
})
export class ChamadosModule {}