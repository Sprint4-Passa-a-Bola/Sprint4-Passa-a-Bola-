import React from "react";

/* ========= Loader automático de imagens em src/assets/** ========= */
const allImages = import.meta.glob("../assets/**/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  import: "default",
});

const imgIndex = {};
const norm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

Object.entries(allImages).forEach(([path, mod]) => {
  const base = path.split("/").pop().replace(/\.(png|jpe?g|svg|webp)$/i, "");
  imgIndex[norm(base)] = mod;
});

const pick = (...cands) => {
  for (const c of cands) {
    if (!c) continue;
    const s = norm(c);
    if (imgIndex[s]) return imgIndex[s];
    const loose = Object.keys(imgIndex).find((k) => k.includes(s));
    if (loose) return imgIndex[loose];
  }
  return null;
};

/* ========= Mapeamento de nomes de time -> arquivo ========= */
const alias = {
  "sao-paulo": "brasao-do-sao-paulo-futebol-clube-svg",
  spfc: "brasao-do-sao-paulo-futebol-clube-svg",
  "sao-paulo-fc": "brasao-do-sao-paulo-futebol-clube-svg",

  "doce-mel": "docemel",
  "pinda-sp": "pindasp",
  botafogo: "botafogo",
  "tuna-luso": "tunaluso",
  coritiba: "coritiba",
  "rolim-de-moura": "rolimdemoura",
  santos: "santos",
  "perolas-negras": "perolasnegras",
  cruzeiro: "cruzeiro",
  corinthians: "corinthians",
  ferroviaria: "ferroviaria",
  flamengo: "flamengo",
  palmeiras: "palmeiras",
};
const teamLogo = (name) => {
  const b = norm(name);
  const tries = [
    alias[b],
    b,
    b.replace(/-futebol-clube|fc|sc|ac/g, ""),
    b.replace(/-sp/g, ""),
    b === "sao-paulo" ? "spfc" : null,
  ].filter(Boolean);

  for (const t of tries) {
    const s = norm(t);
    if (imgIndex[s]) return imgIndex[s];
    const loose = Object.keys(imgIndex).find((k) => k.includes(s));
    if (loose) return imgIndex[loose];
  }
  return null;
};

/* ========= Logos dos HEADERS ========= */
const headerA1 = pick("BrasileiraoFeminino", "BrasileiraFeminino", "brasileirao-feminino", "feminino-a1");
const headerCopa = pick("CopaBrasil", "copa-do-brasil-feminina", "copa-brasil-feminina");

/* ========= Dados mock (mantidos) ========= */
const tabela = [
  { pos: 1, time: "Cruzeiro", pts: 35, vit: 10, e: 2, d: 0, sg: 10, pj: 13, logo: teamLogo("Cruzeiro") },
  { pos: 2, time: "Corinthians", pts: 27, vit: 8, e: 3, d: 2, sg: 10, pj: 13, logo: teamLogo("Corinthians") },
  { pos: 3, time: "São Paulo", pts: 25, vit: 7, e: 4, d: 2, sg: 10, pj: 13, logo: teamLogo("São Paulo") },
  { pos: 4, time: "Ferroviária", pts: 24, vit: 7, e: 3, d: 3, sg: 17, pj: 12, logo: teamLogo("Ferroviária") },
  { pos: 5, time: "Flamengo", pts: 24, vit: 7, e: 3, d: 3, sg: 15, pj: 13, logo: teamLogo("Flamengo") },
  { pos: 6, time: "Palmeiras", pts: 20, vit: 6, e: 2, d: 5, sg: 10, pj: 13, logo: teamLogo("Palmeiras") },
];

const jogos = [
  { m: { n: "Doce Mel", l: teamLogo("Doce Mel") }, v: { n: "Pinda-SP", l: teamLogo("Pinda-SP") }, dh: "09/06 • 15:00", est: "WALDOMIRO CRUZ" },
  { m: { n: "Botafogo", l: teamLogo("Botafogo") }, v: { n: "Tuna Luso", l: teamLogo("Tuna Luso") }, dh: "10/06 • 10:00", est: "NILTON SANTOS" },
  { m: { n: "Coritiba", l: teamLogo("Coritiba") }, v: { n: "Rolim de Moura", l: teamLogo("Rolim de Moura") }, dh: "11/06 • 15:30", est: "CT BAYARD OSNA" },
  { m: { n: "Santos", l: teamLogo("Santos") }, v: { n: "Pérolas Negras", l: teamLogo("Pérolas Negras") }, dh: "11/06 • 20:00", est: "VILA BELMIRO" },
];

/* ========= Calendário por temporada (LOCAL, sem JSON externo) ========= */
const TEMPORADAS = [
  {
    ano: 2025,
    torneios: [
      { id: "bra-a1-2025", nome: "Brasileirão Feminino A1", inicio: "2025-03-02", fim: "2025-09-22", status: "Em andamento", campeao: null },
      { id: "libertadores-2025", nome: "CONMEBOL Libertadores Feminina", inicio: "2025-10-10", fim: "2025-10-26", status: "Previsto", campeao: null },
    ],
  },
  {
    ano: 2024,
    torneios: [
      { id: "bra-a1-2024", nome: "Brasileirão Feminino A1", inicio: "2024-03-17", fim: "2024-09-22", status: "Encerrado", campeao: "Corinthians" },
      { id: "paulista-2024", nome: "Paulista Feminino", inicio: "2024-08-01", fim: "2024-12-10", status: "Encerrado", campeao: "Santos" },
    ],
  },
];

const TEMP_ANOS = TEMPORADAS.map((t) => t.ano).sort((a, b) => b - a);

const SZ = { headerH: 88, headerLogoA1: 56, headerLogoCopa: 68, tableLogo: 30, matchLogo: 40 };

/* ========= Helpers UI ========= */
function StatusBadge({ status, inicio, fim }) {
  const hoje = new Date();
  const ini = new Date(inicio);
  const end = new Date(fim);
  const calc =
    status || (hoje < ini ? "Previsto" : hoje > end ? "Encerrado" : "Em andamento");

  const cls =
    calc === "Encerrado"
      ? "bg-gray-100 text-gray-700"
      : calc === "Em andamento"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${cls}`}>{calc}</span>;
}

/* ================= PÁGINA ================= */
export default function Campeonatos() {
  const [temporada, setTemporada] = React.useState(String(TEMP_ANOS[0] || ""));
  const lista = React.useMemo(() => {
    const t = TEMPORADAS.find((x) => String(x.ano) === String(temporada));
    const arr = (t?.torneios || []).slice().sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    return arr;
  }, [temporada]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#6D28D9] text-center tracking-wide mb-6">
        CAMPEONATOS EM ANDAMENTO
      </h1>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-stretch">
        {/* ===== ESQUERDA: TABELA A1 ===== */}
        <section className="bg-white rounded-2xl shadow-[0_10px_24px_rgba(10,10,20,.06)] overflow-hidden h-full flex flex-col">
          <div className="bg-[#FADF63] rounded-t-2xl px-5 flex items-center" style={{ height: SZ.headerH }}>
            <div className="flex items-center gap-3">
              {headerA1 && (
                <img
                  src={headerA1}
                  alt="Brasileirão Feminino"
                  style={{ width: SZ.headerLogoA1, height: SZ.headerLogoA1, maxHeight: SZ.headerH - 16 }}
                  className="object-contain"
                />
              )}
              <div className="leading-tight">
                <h2 className="text-[20px] md:text-[22px] font-extrabold uppercase">
                  CAMPEONATO BRASILEIRO DE FUTEBOL FEMININO A1
                </h2>
                <p className="text-[12px] md:text-[13px] font-semibold tracking-wide uppercase">
                  RODADA 18 • CLASSIFICAÇÃO
                </p>
              </div>
            </div>
          </div>

          <Tabela rows={tabela} />

          <div className="mt-auto px-5 py-4 flex justify-end">
            <a href="#" className="inline-flex items-center gap-1 text-[#7B3AF5] font-semibold hover:underline">
              Ver Tabela Completa <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* ===== DIREITA: COPA DO BRASIL ===== */}
        <section className="bg-white rounded-2xl shadow-[0_10px_24px_rgba(10,10,20,.06)] overflow-hidden h-full flex flex-col">
          <div className="bg-[#7B3AF5] rounded-t-2xl px-5 flex items-center" style={{ height: SZ.headerH }}>
            <div className="flex items-center gap-3">
              {headerCopa && (
                <img
                  src={headerCopa}
                  alt="Copa do Brasil Feminina"
                  style={{ width: SZ.headerLogoCopa, height: SZ.headerLogoCopa, maxHeight: SZ.headerH - 16 }}
                  className="object-contain"
                />
              )}
              <div className="leading-snug">
                <h2 className="text-[20px] md:text-[22px] font-extrabold tracking-wide uppercase">
                  COPA DO BRASIL FEMININA
                </h2>
                <p className="text-[12px] md:text-[13px] font-semibold tracking-wide uppercase">
                  QUARTAS DE FINAL • PRÓXIMOS JOGOS
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-3 flex-1">
            {jogos.map((j, i) => (
              <Jogo key={i} j={j} />
            ))}
          </div>

          <div className="mt-auto px-5 py-4 flex justify-end">
            <a href="#" className="inline-flex items-center gap-1 text-[#7B3AF5] font-semibold hover:underline">
              Ver Chaveamento Completo <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      </div>

      <Resultados />

      {/* ===== Calendário por Temporada (LOCAL) ===== */}
      <section className="mt-8 md:mt-10">
        <div className="bg-white rounded-2xl shadow-[0_10px_24px_rgba(10,10,20,.06)] p-4 sm:p-5 ring-1 ring-black/5">
          <div className="flex items-start md:items-center gap-3 flex-col md:flex-row mb-4">
            <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide">Calendário por Temporada</h3>
            <div className="md:ml-auto">
              <label className="text-sm text-gray-700">
                Temporada{" "}
                <select
                  className="ml-2 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={temporada}
                  onChange={(e) => setTemporada(e.target.value)}
                  aria-label="Selecionar temporada"
                >
                  {TEMP_ANOS.map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {lista.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Nenhum torneio encontrado para esta temporada.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lista.map((t) => (
                <article key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                  <h4 className="text-lg font-extrabold mb-1">{t.nome}</h4>
                  <div className="text-xs text-gray-500 mb-3">
                    {new Date(t.inicio).toLocaleDateString("pt-BR")} – {new Date(t.fim).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <StatusBadge status={t.status} inicio={t.inicio} fim={t.fim} />
                    {t.campeao && (
                      <span className="text-xs text-gray-700">• Campeão: <strong>{t.campeao}</strong></span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="w-full bg-[#7B3AF5] text-white rounded-xl py-2.5 font-extrabold hover:brightness-95"
                    onClick={() => alert(`${t.nome}`)}
                  >
                    Ver detalhes
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= SUBCOMPONENTES ================= */
function Logo({ src, alt, size }) {
  return src ? (
    <img src={src} alt={alt} style={{ width: size, height: size }} className="object-contain shrink-0" />
  ) : (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gray-200 grid place-items-center text-[10px] font-bold text-gray-600 shrink-0"
    >
      {alt?.[0] ?? "?"}
    </div>
  );
}

function Tabela({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-fixed">
        <colgroup>
          <col style={{ width: "60px" }} />
          <col />
          <col style={{ width: "64px" }} />
          <col style={{ width: "56px" }} />
          <col style={{ width: "56px" }} />
          <col style={{ width: "56px" }} />
          <col style={{ width: "64px" }} />
          <col style={{ width: "64px" }} />
        </colgroup>

        <thead>
          <tr className="text-gray-500 text-xs sm:text-sm uppercase">
            <th className="py-3 pl-5 pr-2">Pos</th>
            <th className="py-3 px-2">Time</th>
            <th className="py-3 pr-6 text-right">Pts</th>
            <th className="py-3 pr-6 text-right">Vit</th>
            <th className="py-3 pr-6 text-right">E</th>
            <th className="py-3 pr-6 text-right">D</th>
            <th className="py-3 pr-6 text-right">SG</th>
            <th className="py-3 pr-6 text-right">PJ</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {rows.map((r) => (
            <tr key={r.pos} className="text-[15px]">
              <td className="py-3 pl-5 pr-2 font-bold tabular-nums">{r.pos}</td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                  <Logo src={r.logo} alt={r.time} size={SZ.tableLogo} />
                  <span className="font-medium leading-none">{r.time}</span>
                </div>
              </td>
              <td className="py-3 pr-6 text-right font-extrabold tabular-nums">{r.pts}</td>
              <td className="py-3 pr-6 text-right tabular-nums">{r.vit}</td>
              <td className="py-3 pr-6 text-right tabular-nums">{r.e}</td>
              <td className="py-3 pr-6 text-right tabular-nums">{r.d}</td>
              <td className="py-3 pr-6 text-right tabular-nums">{r.sg}</td>
              <td className="py-3 pr-6 text-right tabular-nums">{r.pj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Lado({ n, l, align }) {
  const base = "flex items-center gap-3 min-w-0";
  return (
    <div className={`${base} ${align === "right" ? "justify-end" : ""}`}>
      {align === "left" && <Logo src={l} alt={n} size={SZ.matchLogo} />}
      <span
        className={`uppercase font-extrabold tracking-wider leading-none text-[14px] sm:text-[15px] ${
          align === "right" ? "text-right" : ""
        } truncate`}
      >
        {n}
      </span>
      {align === "right" && <Logo src={l} alt={n} size={SZ.matchLogo} />}
    </div>
  );
}

function Jogo({ j }) {
  return (
    <div
      className="bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 grid items-center gap-3"
      style={{ gridTemplateColumns: "minmax(0,1fr) 200px minmax(0,1fr)" }}
    >
      <Lado n={j.m.n} l={j.m.l} align="left" />
      <div className="text-center leading-tight">
        <div className="font-extrabold tracking-wider text-[14px] sm:text-[15px] uppercase">
          {j.dh}
        </div>
        <div className="text-[11px] text-gray-500 tracking-widest uppercase">
          {j.est}
        </div>
      </div>
      <Lado n={j.v.n} l={j.v.l} align="right" />
    </div>
  );
}

function ResultadoCard({ r }) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="absolute top-3 left-3">
        <span className="text-xs font-semibold text-gray-600">{r.data}</span>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <Logo src={r.m.l} alt={r.m.n} size={SZ.matchLogo} />
          <span className="font-semibold leading-none">{r.m.n}</span>
        </div>

        <span className="text-lg font-extrabold tracking-wider tabular-nums leading-none">
          {r.placar}
        </span>

        <div className="flex items-center gap-2">
          <span className="font-semibold leading-none">{r.v.n}</span>
          <Logo src={r.v.l} alt={r.v.n} size={SZ.matchLogo} />
        </div>
      </div>
    </div>
  );
}

function Resultados() {
  const dados = [
    { data: "22/05", m: { n: "Palmeiras", l: teamLogo("Palmeiras") }, v: { n: "Cruzeiro", l: teamLogo("Cruzeiro") }, placar: "0x1" },
    { data: "12/04", m: { n: "Ferroviária", l: teamLogo("Ferroviária") }, v: { n: "São Paulo", l: teamLogo("São Paulo") }, placar: "1x0" },
    { data: "09/06", m: { n: "Corinthians", l: teamLogo("Corinthians") }, v: { n: "Flamengo", l: teamLogo("Flamengo") }, placar: "0x1" },
  ];
  return (
    <section className="mt-8 md:mt-10">
      <div className="bg-white rounded-2xl shadow-[0_10px_24px_rgba(10,10,20,.06)] p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⏱️</span>
          <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide">
            Resultados Recentes
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dados.map((r, i) => (
            <ResultadoCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
