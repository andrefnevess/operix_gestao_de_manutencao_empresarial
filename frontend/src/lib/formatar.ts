const opcoes = { timeZone: "UTC" } as const;

export const formatarData = (iso: string) => new Intl.DateTimeFormat("pt-BR", opcoes).format(new Date(iso));
export const formatarDataLonga = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { ...opcoes, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
export const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;