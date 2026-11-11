import { Module } from '@nestjs/common';
import { ChamadosModule } from '../chamados/chamados.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { MemoriaOrdemServicoRepository } from './memoria-ordem-servico.repository';
import { OrdemServicoRepository } from './ordem-servico.repository';
import { OrdensServicoController } from './ordens-servico.controller';
import { OrdensServicoService } from './ordens-servico.service';

@Module({
imports: [ChamadosModule, UsuariosModule],
controllers: [OrdensServicoController],
providers: [
OrdensServicoService,
{ provide: OrdemServicoRepository, useClass: MemoriaOrdemServicoRepository },
],
exports: [OrdemServicoRepository, OrdensServicoService],
})
export class OrdensServicoModule {}