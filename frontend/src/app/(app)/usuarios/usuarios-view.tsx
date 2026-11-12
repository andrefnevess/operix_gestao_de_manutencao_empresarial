"use client";

import { useState, type FormEvent } from "react";
import { criarUsuario, mudarStatusUsuario } from "@/app/acoes";
import { BOTAO, BOTAO_SECUNDARIO, CAMPO, MensagemErro, Pilula, ROTULO } from "@/components/ui";
import { useAcao } from "@/components/usar-acao";
import { ROTULO_PERFIL, type Perfil, type Usuario } from "@/lib/tipos";

const PERFIS = Object.keys(ROTULO_PERFIL) as Perfil[];

export function UsuariosView({ usuarios, idAtual }: { usuarios: Usuario[]; idAtual: string }) {
  const [formAberto, setFormAberto] = useState(false);
  const [perfil, setPerfil] = useState<Perfil>("TECNICO");
  const [aviso, setAviso] = useState("");
  const { enviando, erro, rodar, limparErro } = useAcao();

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome")).trim();
    const especialidades = perfil === "TECNICO" ? String(f.get("especialidades") ?? "").split(",").map((x) => x.trim()).filter(Boolean) : [];
    rodar(
      () => criarUsuario({ nome, email: String(f.get("email")).trim(), senha: String(f.get("senha")), perfil, especialidades }),
      () => { setAviso(`Usuário ${nome} cadastrado.`); setFormAberto(false); },
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        {!formAberto && <button type="button" className={BOTAO} onClick={() => { setFormAberto(true); setAviso(""); limparErro(); }}>Novo usuário</button>}
      </div>

      {aviso && <p role="status" className="mb-4 rounded-sm bg-[#d6eadd] px-4 py-2 text-sm text-[#255238]">{aviso}</p>}
      {!formAberto && <div className="mb-4"><MensagemErro>{erro}</MensagemErro></div>}

      {formAberto && (
        <form onSubmit={salvar} className="mb-6 rounded-sm border border-linha bg-papel p-5">
          <h2 className="mb-4 font-condensada text-xl font-semibold">Novo usuário</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="nome" className={ROTULO}>Nome</label>
              <input id="nome" name="nome" required minLength={2} className={CAMPO} />
            </div>
            <div>
              <label htmlFor="email" className={ROTULO}>E-mail</label>
              <input id="email" name="email" type="email" required autoComplete="off" className={CAMPO} />
            </div>
            <div>
              <label htmlFor="senha" className={ROTULO}>Senha inicial (mínimo de 8 caracteres)</label>
              <input id="senha" name="senha" type="password" required minLength={8} autoComplete="new-password" className={CAMPO} />
            </div>
            <div>
              <label htmlFor="perfil" className={ROTULO}>Perfil</label>
              <select id="perfil" name="perfil" value={perfil} onChange={(e) => setPerfil(e.target.value as Perfil)} className={CAMPO}>
                {PERFIS.map((p) => <option key={p} value={p}>{ROTULO_PERFIL[p]}</option>)}
              </select>
            </div>
            {perfil === "TECNICO" && (
              <div className="md:col-span-2">
                <label htmlFor="especialidades" className={ROTULO}>Especialidades, separadas por vírgula</label>
                <input id="especialidades" name="especialidades" placeholder="Ex.: Elétrica, Refrigeração" className={CAMPO} />
              </div>
            )}
          </div>
          <div className="mt-4"><MensagemErro>{erro}</MensagemErro></div>
          <div className="mt-5 flex gap-3">
            <button type="submit" disabled={enviando} className={BOTAO}>{enviando ? "Salvando" : "Salvar usuário"}</button>
            <button type="button" onClick={() => { setFormAberto(false); limparErro(); }} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-concreto">Cancelar</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-sm bg-papel">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-linha text-mudo">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Nome</th>
              <th scope="col" className="px-4 py-3 font-medium">E-mail</th>
              <th scope="col" className="px-4 py-3 font-medium">Perfil</th>
              <th scope="col" className="px-4 py-3 font-medium">Situação</th>
              <th scope="col" className="px-4 py-3 font-medium"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-linha">
            {usuarios.map((u) => (
              <tr key={u.id}>
                <th scope="row" className="px-4 py-3 font-medium">{u.nome}</th>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{ROTULO_PERFIL[u.perfil]}{u.especialidades.length > 0 && <span className="text-mudo"> · {u.especialidades.join(", ")}</span>}</td>
                <td className="px-4 py-3">{u.ativo ? <Pilula tom="verde">Ativo</Pilula> : <Pilula tom="cinza">Inativo</Pilula>}</td>
                <td className="px-4 py-3 text-right">
                  {u.id !== idAtual && (
                    <button type="button" disabled={enviando} className={BOTAO_SECUNDARIO} onClick={() => rodar(() => mudarStatusUsuario(u.id, u.ativo ? "inativar" : "reativar"))}>
                      {u.ativo ? "Inativar" : "Reativar"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
