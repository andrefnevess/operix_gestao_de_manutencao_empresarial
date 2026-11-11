import { Module } from '@nestjs/common';
import { EquipamentosModule } from '../equipamentos/equipamentos.module';
import { OrdensServicoModule } from '../ordens-servico/ordens-servico.module';
import { MemoriaPlanoRepository } from './memoria-plano.repository';
import { PlanoRepository } from './plano.repository';
import { PlanosController } from './planos.controller';
import { PlanosService } from './planos.service';

@Module({
imports: [EquipamentosModule, OrdensServicoModule],
controllers: [PlanosController],
providers: [
PlanosService,
{ provide: PlanoRepository, useClass: MemoriaPlanoRepository },
],
exports: [PlanoRepository, PlanosService],
})
export class PlanosModule {}