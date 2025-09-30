// src/components/Login.jsx  (ou src/Login.jsx se for aí)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 👇 Autenticador embutido (sem import). Ajusta como quiser.
async function autenticar({ email, senha }) {
  // mock simples: qualquer email + senha "1234" entra
  if (String(senha) === "1234") {
    return { ok: true, token: "dev-token", user: { email: String(email || "") } };
  }
  throw new Error("Credenciais inválidas");
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await autenticar({ email, senha });
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ok: res.ok,
          token: res.token,
          email: res.user.email,
          ts: Date.now(), // <- necessário pro isAuthed() do App.jsx
        })
      );
      window.location.replace("/"); // garante navegação
      // ou: navigate("/", { replace: true });
    } catch (err) {
      setErro("Credenciais inválidas!");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-yellow-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-5">
        <div className="group rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 p-8 md:p-10">
          <h1 className="text-4xl font-extrabold text-center leading-tight">
            <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent">
              Passa a Bola
            </span>
          </h1>
          <p className="mt-2 text-center text-sm text-gray-700/90">
            Faça login para acessar o sistema
          </p>

          {erro && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-center text-red-700 text-sm font-semibold">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email</label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                       className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M4 6h16v12H4z" /><path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-white/90 py-3 pl-11 pr-4 text-[15px] outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Senha</label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                       className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                  </svg>
                </span>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-white/90 py-3 pl-11 pr-16 text-[15px] outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-300"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute inset-y-0 right-2 my-1 rounded-xl px-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <div className="mt-1 text-xs text-gray-600">
                Dica: A senha é <span className="font-semibold">“1234”</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 py-3 text-[15px] font-extrabold text-gray-900 shadow-lg transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600">
            Ao entrar, você concorda com os termos da plataforma.
          </div>
        </div>

        <div className="mt-3 text-center text-[11px] text-white/80">v1.0 — Projeto acadêmico</div>
      </div>
    </div>
  );
}
