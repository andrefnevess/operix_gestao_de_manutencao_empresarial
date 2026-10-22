'use client';

import { useParams } from 'next/navigation';
import { Protegida } from '@/components/Protegida';
import { UsuarioForm } from '@/components/UsuarioForm';
import { permissoes } from '@/services/api';

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  return (
    <Protegida regra={permissoes.gerenciarUsuarios}>
      <UsuarioForm id={id} />
    </Protegida>
  );
}
