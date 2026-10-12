-- CreateEnum
CREATE TYPE "StatusOrdemServico" AS ENUM ('ABERTA', 'ATRIBUIDA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "PrioridadeOrdem" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'CRITICA');

-- CreateEnum
CREATE TYPE "StatusAtivo" AS ENUM ('DISPONIVEL', 'EM_MANUTENCAO', 'INATIVO');

-- CreateTable
CREATE TABLE "Ativo" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "status" "StatusAtivo" NOT NULL DEFAULT 'DISPONIVEL',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tecnico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "StatusOrdemServico" NOT NULL DEFAULT 'ABERTA',
    "prioridade" "PrioridadeOrdem" NOT NULL DEFAULT 'MEDIA',
    "ativoId" INTEGER NOT NULL,
    "tecnicoId" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrdemServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoManutencao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativoId" INTEGER NOT NULL,
    "periodicidadeDias" INTEGER NOT NULL,
    "proximaExecucao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanoManutencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ativo_codigo_key" ON "Ativo"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Tecnico_matricula_key" ON "Tecnico"("matricula");

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_ativoId_fkey" FOREIGN KEY ("ativoId") REFERENCES "Ativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "Tecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoManutencao" ADD CONSTRAINT "PlanoManutencao_ativoId_fkey" FOREIGN KEY ("ativoId") REFERENCES "Ativo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
