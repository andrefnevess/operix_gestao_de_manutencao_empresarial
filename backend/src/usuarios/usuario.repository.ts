import { Usuario } from '../domain';

/**
 * Porta de persistência de usuários. O serviço depende desta abstração,
 * e não do Prisma (inversão de dependência).
 */
export abstract class UsuarioRepository {
  abstract buscarPorId(id: string): Promise<Usuario | null>;
  abstract buscarPorEmail(email: string): Promise<Usuario | null>;
  abstract listar(): Promise<Usuario[]>;
  abstract salvar(usuario: Usuario): Promise<void>;
}
