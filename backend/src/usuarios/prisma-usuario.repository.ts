import { Injectable } from '@nestjs/common';
import { Perfil, Tecnico, Usuario } from '../domain';
import { PrismaService } from '../infra/prisma.service';
import { UsuarioRepository } from './usuario.repository';

interface LinhaUsuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  perfil: string;
  ativo: boolean;
  especialidades: string[];
  tentativasFalhas: number;
  bloqueadoAte: Date | null;
}

/** Implementação com PostgreSQL. Converte linhas do banco em objetos de domínio e vice-versa. */
@Injectable()
export class PrismaUsuarioRepository extends UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const linha = await this.prisma.usuario.findUnique({ where: { id } });
    return linha ? this.paraDominio(linha) : null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const linha = await this.prisma.usuario.findUnique({ where: { email: email.trim().toLowerCase() } });
    return linha ? this.paraDominio(linha) : null;
  }

  async listar(): Promise<Usuario[]> {
    const linhas: LinhaUsuario[] = await this.prisma.usuario.findMany({ orderBy: { nome: 'asc' } });
    return linhas.map((l) => this.paraDominio(l));
  }

  async salvar(u: Usuario): Promise<void> {
    const dados = {
      nome: u.getNome(),
      email: u.getEmail(),
      senhaHash: u.getSenhaHash(),
      perfil: u.getPerfil(),
      ativo: u.estaAtivo(),
      especialidades: u instanceof Tecnico ? u.getEspecialidades() : [],
      tentativasFalhas: u.getTentativasFalhas(),
      bloqueadoAte: u.getBloqueadoAte(),
    };
    await this.prisma.usuario.upsert({ where: { id: u.getId() }, create: { id: u.getId(), ...dados }, update: dados });
  }

  private paraDominio(l: LinhaUsuario): Usuario {
    return Usuario.criar(l.perfil as Perfil, {
      id: l.id,
      nome: l.nome,
      email: l.email,
      senhaHash: l.senhaHash,
      ativo: l.ativo,
      especialidades: l.especialidades,
      tentativasFalhas: l.tentativasFalhas,
      bloqueadoAte: l.bloqueadoAte,
    });
  }
}
