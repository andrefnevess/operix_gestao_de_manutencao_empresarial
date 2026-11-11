// Popula o banco com dados fictícios para desenvolvimento: npm run prisma:seed
// A senha dos usuários de exemplo vem de SENHA_EXEMPLO (veja .env.example). Nunca use dados reais.
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { EQUIPAMENTOS_EXEMPLO, USUARIOS_EXEMPLO } from '../src/infra/dados-exemplo';

async function main(): Promise<void> {
  const senha = process.env.SENHA_EXEMPLO;
  if (!senha) throw new Error('Defina SENHA_EXEMPLO no arquivo .env antes de rodar o seed.');
  const prisma = new PrismaClient();
  const senhaHash = bcrypt.hashSync(senha, 10);
  for (const u of USUARIOS_EXEMPLO) {
    await prisma.usuario.upsert({
      where: { email: u.email },
      update: {},
      create: { nome: u.nome, email: u.email, perfil: u.perfil, senhaHash, especialidades: u.especialidades ?? [] },
    });
  }
  for (const e of EQUIPAMENTOS_EXEMPLO) {
    await prisma.equipamento.upsert({ where: { codigo: e.codigo }, update: {}, create: e });
  }
  await prisma.$disconnect();
  console.log('Seed concluído.');
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
