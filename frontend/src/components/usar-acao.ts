"use client";

import { useState, useTransition } from "react";
import type { Resultado } from "@/lib/tipos";

/** Roda uma Server Action e guarda o estado de envio e a mensagem de erro devolvida pela API. */
export function useAcao() {
  const [enviando, iniciar] = useTransition();
  const [erro, setErro] = useState("");

  function rodar(acao: () => Promise<Resultado>, aoConcluir?: () => void) {
    setErro("");
    iniciar(async () => {
      const resultado = await acao();
      if (resultado.ok) aoConcluir?.();
      else setErro(resultado.erro);
    });
  }
  return { enviando, erro, rodar, limparErro: () => setErro("") };
}
