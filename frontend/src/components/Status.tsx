import { StatusEquipamento } from '../services/api';

const ESTILO: Record<StatusEquipamento, { texto: string; classe: string }> = {
  ATIVO: { texto: 'Ativo', classe: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
  EM_MANUTENCAO: { texto: 'Em manutenção', classe: 'bg-amber-50 text-amber-800 ring-amber-200' },
  INATIVO: { texto: 'Inativo', classe: 'bg-slate-100 text-slate-600 ring-slate-200' },
};

export function StatusEquipamentoTag({ status }: { status: StatusEquipamento }) {
  const { texto, classe } = ESTILO[status];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${classe}`}>{texto}</span>;
}

export function AtivoTag({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        ativo ? 'bg-emerald-50 text-emerald-800 ring-emerald-200' : 'bg-slate-100 text-slate-600 ring-slate-200'
      }`}
    >
      {ativo ? 'Ativo' : 'Inativo'}
    </span>
  );
}

export function Aviso({ mensagem, tipo = 'erro' }: { mensagem: string; tipo?: 'erro' | 'sucesso' }) {
  const classe = tipo === 'erro' ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800';
  return (
    <p role={tipo === 'erro' ? 'alert' : 'status'} className={`rounded-md border px-4 py-3 text-sm ${classe}`}>
      {mensagem}
    </p>
  );
}
