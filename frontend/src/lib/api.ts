// Cliente da API NestJS. Roda só no servidor do Next (Server Components e Server Actions):
// o token fica em um cookie httpOnly e nunca chega ao JavaScript do navegador.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// No Docker Compose a API é http://api:3000 (variável API_URL); fora dele, a API local.
const API_URL = (process.env.API_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const COOKIE_TOKEN = "operix_token";

export class ErroApi extends Error {
  constructor(readonly status: number, mensagem: string) {
    super(mensagem);
    this.name = "ErroApi";
  }
}

interface Opcoes { metodo?: "GET" | "POST" | "PUT" | "PATCH"; corpo?: unknown; publico?: boolean }

export async function api<T>(caminho: string, { metodo = "GET", corpo, publico = false }: Opcoes = {}): Promise<T> {
  const token = publico ? undefined : (await cookies()).get(COOKIE_TOKEN)?.value;
  if (!publico && !token) redirect("/login");

  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}/api${caminho}`, {
      method: metodo,
      cache: "no-store",
      headers: {
        ...(corpo !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
  } catch {
    throw new ErroApi(503, "Não foi possível falar com a API. Confira se o back-end está no ar.");
  }

  // Token ausente, vencido ou de usuário inativado: volta para o login.
  if (resposta.status === 401 && !publico) redirect("/login");
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);
    const mensagem = Array.isArray(erro?.message) ? erro.message.join(" ") : erro?.message;
    throw new ErroApi(resposta.status, mensagem || "A operação não pôde ser concluída.");
  }
  return (resposta.status === 204 ? undefined : await resposta.json()) as T;
}
