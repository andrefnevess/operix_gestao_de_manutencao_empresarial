import { Module } from '@nestjs/common';
import { ChamadosModule } from '../chamados/chamados.module';
import { usarMemoria } from '../infra/persistencia';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { MemoriaOrdemServicoRepository } from './memoria-ordem-servico.repository';
import { OrdemServicoRepository } from './ordem-servico.repository';
import { OrdensServicoController } from './ordens-servico.controller';
import { OrdensServicoService } from './ordens-servico.service';
import { PrismaOrdemServicoRepository } from './prisma-ordem-servico.repository';

@Module({
  imports: [ChamadosModule, UsuariosModule],
  controllers: [OrdensServicoController],
  providers: [
    OrdensServicoService,
    { provide: OrdemServicoRepository, useClass: usarMemoria() ? MemoriaOrdemServicoRepository : PrismaOrdemServicoRepository },
  ],
  exports: [OrdemServicoRepository, OrdensServicoService],
})
export class OrdensServicoModule {}
