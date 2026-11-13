// Horário de Brasília: uma ordem aberta à noite não aparece com a data do dia seguinte.
const opcoes = { timeZone: "America/Sao_Paulo" } as const;

export const formatarData = (iso: string) => new Intl.DateTimeFormat("pt-BR", opcoes).format(new Date(iso));
export const formatarDataLonga = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { ...opcoes, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
export const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;
/** Identificador curto para mostrar na tela no lugar do UUID completo. */
export const codigoCurto = (id: string) => id.slice(0, 5).toUpperCase();
