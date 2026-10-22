'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Usuario } from '../services/api';
import { useSessao } from '../services/sessao';

/** Exige login e, opcionalmente, uma regra de perfil. O back-end sempre confere de novo. */
export function Protegida({ children, regra }: { children: ReactNode; regra?: (u: Usuario | null) => boolean }) {
  const { usuario, carregando } = useSessao();
  const router = useRouter();
  const permitido = Boolean(usuario) && (!regra || regra(usuario));

  useEffect(() => {
    if (carregando || permitido) return;
    router.replace(usuario ? '/equipamentos' : '/login');
  }, [carregando, permitido, usuario, router]);

  if (carregando) return <p className="p-8 text-slate-500">Carregando…</p>;
  if (!permitido) return null;
  return <>{children}</>;
}
