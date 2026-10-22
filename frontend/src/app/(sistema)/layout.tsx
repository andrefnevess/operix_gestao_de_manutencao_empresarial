import { ReactNode } from 'react';
import { Layout } from '@/components/Layout';
import { Protegida } from '@/components/Protegida';

/** Telas que exigem login: cabeçalho com navegação por perfil. */
export default function LayoutSistema({ children }: { children: ReactNode }) {
  return (
    <Protegida>
      <Layout>{children}</Layout>
    </Protegida>
  );
}
