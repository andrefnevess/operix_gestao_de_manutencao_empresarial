import { Injectable } from '@nestjs/common';
import { Usuario } from '../domain';
import { UsuarioRepository } from './usuario.repository';

/** Implementação em memória, usada nos testes e com PERSISTENCIA=memoria. */
@Injectable()
export class MemoriaUsuarioRepository extends UsuarioRepository {
  private readonly itens = new Map<string, Usuario>();

  async buscarPorId(id: string): Promise<Usuario | null> {
    return this.itens.get(id) ?? null;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const alvo = email.trim().toLowerCase();
    return [...this.itens.values()].find((u) => u.getEmail() === alvo) ?? null;
  }

  async listar(): Promise<Usuario[]> {
    return [...this.itens.values()].sort((a, b) => a.getNome().localeCompare(b.getNome()));
  }

  async salvar(usuario: Usuario): Promise<void> {
    this.itens.set(usuario.getId(), usuario);
  }
}
