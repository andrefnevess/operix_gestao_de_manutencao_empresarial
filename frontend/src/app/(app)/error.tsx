"use client";

import { BOTAO } from "@/components/ui";

export default function Erro({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-sm bg-papel px-4 py-10 text-center">
      <p className="font-medium">Não foi possível carregar esta tela</p>
      <p className="mt-1 text-sm text-mudo">Confira se a API do Operix está no ar e tente de novo.</p>
      <button type="button" onClick={reset} className={`${BOTAO} mt-4`}>Tentar de novo</button>
    </div>
  );
}
