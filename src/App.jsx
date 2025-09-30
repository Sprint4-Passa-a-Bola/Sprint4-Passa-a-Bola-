// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

// Páginas
import Login from "./components/Login"; // <-- corrigido: está em src/components/Login.jsx
import Inicio from "./pages/Inicio";
import Campeonatos from "./pages/Campeonatos";
import Times from "./pages/Times";
import Noticias from "./pages/Noticias";
import Historia from "./pages/Historia";
import Inscricoes from "./pages/Inscricoes";
import FormularioInscricao from "./pages/FormularioInscricao";
import TimePerfil from "./pages/TimePerfil";

// Estilos
import "./index.css";

// Logo
import logo from "./assets/logo.png";

function isAuthed() {
  try {
    const a = JSON.parse(localStorage.getItem("auth") || "null");
    if (!a?.ok) return false;
    // expira em 2 horas (ajuste se quiser)
    const MAX_AGE_MS = 2 * 60 * 60 * 1000;
    const fresh = typeof a.ts === "number" && (Date.now() - a.ts) < MAX_AGE_MS;
    if (!fresh) {
      localStorage.removeItem("auth");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function logout() {
  localStorage.removeItem("auth");
  window.location.replace("/login");
}

function RequireAuth({ children }) {
  const authed = isAuthed();
  const location = useLocation();
  if (!authed) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 w-full">
          <Routes>
            {/* pública */}
            <Route path="/login" element={<Login />} />

            {/* privadas */}
            <Route
              path="/"
              element={
                isAuthed()
                  ? <RequireAuth><Inicio /></RequireAuth>
                  : <Navigate to="/login" replace />
              }
            />
            <Route path="/campeonatos" element={<RequireAuth><Campeonatos /></RequireAuth>} />
            <Route path="/times" element={<RequireAuth><Times /></RequireAuth>} />
            <Route path="/time/:slug" element={<RequireAuth><TimePerfil /></RequireAuth>} />
            <Route path="/noticias" element={<RequireAuth><Noticias /></RequireAuth>} />
            <Route path="/historia" element={<RequireAuth><Historia /></RequireAuth>} />
            <Route path="/inscricao" element={<RequireAuth><FormularioInscricao /></RequireAuth>} />
            <Route path="/inscricoes" element={<RequireAuth><Inscricoes /></RequireAuth>} />

            {/* fallback */}
            <Route path="*" element={<Navigate to={isAuthed() ? "/" : "/login"} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

/* ===== Header ===== */
function Header() {
  const location = useLocation();
  if (location.pathname === "/login") return null;

  const authed = isAuthed();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Passa a Bola" className="w-20 h-20 object-contain" />
          <span className="text-2xl font-extrabold text-black">Passa a Bola</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/campeonatos">Campeonatos</NavLink>
          <NavLink to="/times">Times</NavLink>
          <NavLink to="/noticias">Notícias</NavLink>
          <NavLink to="/historia">História</NavLink>

          <Link to="/inscricoes" className="bg-purple text-white px-4 py-2 rounded-xl transition-all">
            Inscrição
          </Link>

          {authed && (
            <button
              onClick={logout}
              className="ml-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              title="Sair"
            >
              Sair
            </button>
          )}
        </nav>

        <div className="md:hidden">
          <MobileMenu authed={authed} />
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="hover:text-purple-600 transition-colors">
      {children}
    </Link>
  );
}

/* ===== Mobile ===== */
function MobileMenu({ authed }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button aria-label="Abrir menu" onClick={() => setOpen(v => !v)} className="p-2 rounded-md border border-gray-300">
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg flex flex-col p-3 gap-2">
          <Link onClick={() => setOpen(false)} to="/" className="px-2 py-2 rounded hover:bg-gray-100">Início</Link>
          <Link onClick={() => setOpen(false)} to="/campeonatos" className="px-2 py-2 rounded hover:bg-gray-100">Campeonatos</Link>
          <Link onClick={() => setOpen(false)} to="/times" className="px-2 py-2 rounded hover:bg-gray-100">Times</Link>
          <Link onClick={() => setOpen(false)} to="/noticias" className="px-2 py-2 rounded hover:bg-gray-100">Notícias</Link>
          <Link onClick={() => setOpen(false)} to="/historia" className="px-2 py-2 rounded hover:bg-gray-100">História</Link>
          <Link onClick={() => setOpen(false)} to="/inscricoes" className="px-2 py-2 rounded hover:bg-gray-100 text-center">Inscrições Realizadas</Link>
          <Link onClick={() => setOpen(false)} to="/inscricao" className="px-2 py-2 rounded bg-purple text-white text-center">Inscrição</Link>

          {authed && (
            <button
              onClick={() => { setOpen(false); logout(); }}
              className="mt-1 px-2 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-left"
            >
              Sair
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ===== Footer ===== */
function Footer() {
  const location = useLocation();
  if (location.pathname === "/login") return null;
  return (
    <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-8">
      &copy; {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.
    </footer>
  );
}
