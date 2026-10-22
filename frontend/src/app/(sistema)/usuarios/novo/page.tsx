'use client';

import { Protegida } from '@/components/Protegida';
import { UsuarioForm } from '@/components/UsuarioForm';
import { permissoes } from '@/services/api';

export default function NovoUsuario() {
  return (
    <Protegida regra={permissoes.gerenciarUsuarios}>
      <UsuarioForm />
    </Protegida>
  );
}
