import { Module } from '@nestjs/common';
import { EquipamentosModule } from '../equipamentos/equipamentos.module';
import { OrdensServicoModule } from '../ordens-servico/ordens-servico.module';
import { PlanosModule } from '../planos/planos.module';
import { HistoricoController } from './historico.controller';
import { HistoricoService } from './historico.service';

@Module({
  imports: [EquipamentosModule, OrdensServicoModule, PlanosModule],
  controllers: [HistoricoController],
  providers: [HistoricoService],
})
export class HistoricoModule {}