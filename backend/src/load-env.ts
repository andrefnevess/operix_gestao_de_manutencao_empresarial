// Carrega o arquivo backend/.env antes de qualquer outro módulo da API (corrige a issue #7).
// Deve ser o primeiro import do main.ts, para as variáveis existirem antes de o AppModule ser carregado.
// Usa process.loadEnvFile, nativo do Node 20.12+, sem dependência extra (dotenv ou @nestjs/config).
// Sem arquivo .env (Docker e CI), nada é feito e valem as variáveis do ambiente.
import { existsSync } from 'fs';
import { resolve } from 'path';

// src/ (ts-node-dev) ou dist/ (build): o .env fica um nível acima, na pasta backend/.
const arquivoEnv = resolve(__dirname, '..', '.env');

type ProcessoComLoadEnv = NodeJS.Process & { loadEnvFile?: (caminho?: string) => void };
const processo = process as ProcessoComLoadEnv;

if (existsSync(arquivoEnv)) {
  if (typeof processo.loadEnvFile === 'function') {
    processo.loadEnvFile(arquivoEnv);
  } else {
    console.warn('Este Node não tem process.loadEnvFile (use Node 20.12 ou superior); o .env não foi carregado.');
  }
}
