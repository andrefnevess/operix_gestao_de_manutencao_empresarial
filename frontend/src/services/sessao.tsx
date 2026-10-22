'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { api, token, Usuario } from './api';

interface Sessao {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
}

const ContextoSessao = createContext<Sessao | null>(null);

export function ProvedorSessao({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const restaurar = token.ler()
      ? api
          .eu()
          .then(setUsuario)
          .catch(() => token.limpar())
      : Promise.resolve();
    restaurar.finally(() => setCarregando(false));
  }, []);

  const entrar = useCallback(async (email: string, senha: string) => {
    const resposta = await api.login(email, senha);
    token.salvar(resposta.token);
    setUsuario(resposta.usuario);
  }, []);

  const sair = useCallback(async () => {
    await api.logout().catch(() => undefined);
    token.limpar();
    setUsuario(null);
  }, []);

  return <ContextoSessao.Provider value={{ usuario, carregando, entrar, sair }}>{children}</ContextoSessao.Provider>;
}

export function useSessao(): Sessao {
  const sessao = useContext(ContextoSessao);
  if (!sessao) throw new Error('useSessao deve ser usado dentro de ProvedorSessao.');
  return sessao;
}
