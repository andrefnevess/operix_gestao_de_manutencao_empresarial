'use client';

import { EquipamentoForm } from '@/components/EquipamentoForm';
import { Protegida } from '@/components/Protegida';
import { permissoes } from '@/services/api';

export default function NovoEquipamento() {
  return (
    <Protegida regra={permissoes.gerenciarEquipamentos}>
      <EquipamentoForm />
    </Protegida>
  );
}
