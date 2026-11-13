import { Sidebar } from "@/components/sidebar";
import { obterUsuario } from "@/services/operix";

export default async function LayoutDoApp({ children }: { children: React.ReactNode }) {
  // Sem token válido, obterUsuario redireciona para o login.
  const usuario = await obterUsuario();
  return (
    <div className="md:grid md:grid-cols-[15rem_1fr]">
      <Sidebar usuario={usuario} />
      <main className="w-full max-w-6xl px-5 py-7 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
