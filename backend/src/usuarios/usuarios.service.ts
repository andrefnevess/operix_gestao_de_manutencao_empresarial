import { Injectable } from '@nestjs/common';
import { SenhaService } from '../auth/senha.service';
import { ConflitoError, NaoEncontradoError } from '../common/erros';
import { novoId } from '../common/relogio';
import { Tecnico, Usuario } from '../domain';
import { AtualizarUsuarioDto, CriarUsuarioDto } from './dto/usuario.dto';
import { UsuarioRepository } from './usuario.repository';

/** Casos de uso de usuários e perfis (UH02). */
@Injectable()
export class UsuariosService {
  constructor(
    private readonly repositorio: UsuarioRepository,
    private readonly senhas: SenhaService,
  ) {}

  async criar(dto: CriarUsuarioDto): Promise<Usuario> {
    await this.garantirEmailLivre(dto.email);
    const usuario = Usuario.criar(dto.perfil, {
      id: novoId(),
      nome: dto.nome,
      email: dto.email,
      senhaHash: this.senhas.gerarHash(dto.senha),
      ativo: true,
      tentativasFalhas: 0,
      bloqueadoAte: null,
      especialidades: dto.especialidades ?? [],
    });
    await this.repositorio.salvar(usuario);
    return usuario;
  }

  listar(): Promise<Usuario[]> {
    return this.repositorio.listar();
  }

  async buscar(id: string): Promise<Usuario> {
    const usuario = await this.repositorio.buscarPorId(id);
    if (!usuario) throw new NaoEncontradoError('Usuário não encontrado.');
    return usuario;
  }

  /** Editar nome, e-mail e perfil (UH02-CA04). Mudar o perfil recria o objeto na subclasse correta. */
  async atualizar(id: string, dto: AtualizarUsuarioDto): Promise<Usuario> {
    const atual = await this.buscar(id);
    await this.garantirEmailLivre(dto.email, id);
    const usuario =
      atual.getPerfil() === dto.perfil
        ? atual
        : Usuario.criar(dto.perfil, {
            id: atual.getId(),
            nome: atual.getNome(),
            email: atual.getEmail(),
            senhaHash: atual.getSenhaHash(),
            ativo: atual.estaAtivo(),
            tentativasFalhas: atual.getTentativasFalhas(),
            bloqueadoAte: atual.getBloqueadoAte(),
          });
    usuario.atualizarDados(dto.nome, dto.email);
    if (usuario instanceof Tecnico && dto.especialidades) {
      usuario.definirEspecialidades(dto.especialidades);
    }
    await this.repositorio.salvar(usuario);
    return usuario;
  }

  async inativar(id: string): Promise<Usuario> {
    const usuario = await this.buscar(id);
    usuario.inativar();
    await this.repositorio.salvar(usuario);
    return usuario;
  }

  async reativar(id: string): Promise<Usuario> {
    const usuario = await this.buscar(id);
    usuario.reativar();
    await this.repositorio.salvar(usuario);
    return usuario;
  }

  /** Não pode haver dois usuários com o mesmo e-mail (UH02-CA02). */
  private async garantirEmailLivre(email: string, idAtual?: string): Promise<void> {
    const existente = await this.repositorio.buscarPorEmail(email);
    if (existente && existente.getId() !== idAtual) {
      throw new ConflitoError('Já existe um usuário com este e-mail.');
    }
  }
}
