import { Module } from '@nestjs/common';
import { SenhaService } from '../auth/senha.service';
import { usarMemoria } from '../infra/persistencia';
import { MemoriaUsuarioRepository } from './memoria-usuario.repository';
import { PrismaUsuarioRepository } from './prisma-usuario.repository';
import { UsuarioRepository } from './usuario.repository';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  controllers: [UsuariosController],
  providers: [
    SenhaService,
    UsuariosService,
    { provide: UsuarioRepository, useClass: usarMemoria() ? MemoriaUsuarioRepository : PrismaUsuarioRepository },
  ],
  exports: [UsuarioRepository, UsuariosService, SenhaService],
})
export class UsuariosModule {}
