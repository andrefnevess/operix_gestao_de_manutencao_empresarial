import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { SenhaService } from '../auth/senha.service';
import { novoId } from '../common/relogio';
import { Equipamento, Perfil, Usuario } from '../domain';
import { EquipamentoRepository } from '../equipamentos/equipamento.repository';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { usarMemoria } from './persistencia';

/**
 * Dados fictícios para desenvolvimento e demonstração quando PERSISTENCIA=memoria.
 * Nunca usar dados pessoais reais (docs/07-compliance/lgpd-protecao-de-dados.md).
 */
export const USUARIOS_EXEMPLO: Array<{ nome: string; email: string; perfil: Perfil; especialidades?: string[] }> = [
  { nome: 'Administrador Operix', email: 'admin@operix.local', perfil: Perfil.ADMINISTRADOR },
  { nome: 'Gestora de Manutenção', email: 'gestor@operix.local', perfil: Perfil.GESTOR },
  { nome: 'Técnico de Campo', email: 'tecnico@operix.local', perfil: Perfil.TECNICO, especialidades: ['Elétrica', 'Mecânica'] },
  { nome: 'Solicitante da Produção', email: 'solicitante@operix.local', perfil: Perfil.SOLICITANTE },
];

export const EQUIPAMENTOS_EXEMPLO = [
  { codigo: 'CMP-001', nome: 'Compressor de ar', tipo: 'Compressor', localizacao: 'Galpão A', fabricante: 'Schulz', modelo: 'CSL 20' },
  { codigo: 'EMP-002', nome: 'Empilhadeira elétrica', tipo: 'Empilhadeira', localizacao: 'Expedição', fabricante: 'Toyota', modelo: '8FBE' },
  { codigo: 'ARC-003', nome: 'Ar-condicionado sala de reuniões', tipo: 'Climatização', localizacao: 'Bloco administrativo', fabricante: null, modelo: null },
];

@Injectable()
export class DadosExemplo implements OnApplicationBootstrap {
  private readonly logger = new Logger('DadosExemplo');

  constructor(
    private readonly usuarios: UsuarioRepository,
    private readonly equipamentos: EquipamentoRepository,
    private readonly senhas: SenhaService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (!usarMemoria() || (await this.usuarios.listar()).length > 0) return;
    const senha = process.env.SENHA_EXEMPLO || 'operix-dev';
    const hash = this.senhas.gerarHash(senha);
    for (const u of USUARIOS_EXEMPLO) {
      await this.usuarios.salvar(
        Usuario.criar(u.perfil, { id: novoId(), nome: u.nome, email: u.email, senhaHash: hash, ativo: true, tentativasFalhas: 0, bloqueadoAte: null, especialidades: u.especialidades }),
      );
    }
    for (const e of EQUIPAMENTOS_EXEMPLO) {
      await this.equipamentos.salvar(Equipamento.novo(novoId(), e));
    }
    this.logger.log(`Dados de exemplo carregados (${USUARIOS_EXEMPLO.length} usuários, ${EQUIPAMENTOS_EXEMPLO.length} equipamentos).`);
  }
}
