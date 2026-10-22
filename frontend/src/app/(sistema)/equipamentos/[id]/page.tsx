'use client';

import { useParams } from 'next/navigation';
import { EquipamentoForm } from '@/components/EquipamentoForm';
import { Protegida } from '@/components/Protegida';
import { permissoes } from '@/services/api';

export default function EditarEquipamento() {
  const { id } = useParams<{ id: string }>();
  return (
    <Protegida regra={permissoes.gerenciarEquipamentos}>
      <EquipamentoForm id={id} />
    </Protegida>
  );
}
