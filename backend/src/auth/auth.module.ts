import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

function segredoJwt(): string {
  const segredo = process.env.JWT_SECRET;
  if (!segredo && process.env.NODE_ENV === 'production') {
    throw new Error('Defina a variável JWT_SECRET.');
  }
  return segredo ?? 'segredo-apenas-para-desenvolvimento';
}

@Module({
  imports: [UsuariosModule, JwtModule.register({ secret: segredoJwt(), signOptions: { expiresIn: '8h' } })],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
