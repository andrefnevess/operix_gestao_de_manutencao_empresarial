import { PlanosModule } from './planos/planos.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { ChamadosModule } from './chamados/chamados.module';
import { OrdensServicoModule } from './ordens-servico/ordens-servico.module';
import { DadosExemplo } from './infra/dados-exemplo';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [CommonModule, UsuariosModule, AuthModule, EquipamentosModule, ChamadosModule, OrdensServicoModule, PlanosModule],
  providers: [DadosExemplo],
})
export class AppModule {}
