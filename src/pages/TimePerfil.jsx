// src/pages/TimePerfil.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const assetsLower = import.meta.glob("../assets/**/*.{png,jpg,jpeg,svg,webp}", { eager: true, import: "default" });
const assetsUpper = import.meta.glob("../assets/**/*.{PNG,JPG,JPEG,SVG,WEBP}", { eager: true, import: "default" });
const allAssets = { ...assetsLower, ...assetsUpper };

const norm = (s = "") =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");

const getAssetExact = (keys) => {
  const arr = Array.isArray(keys) ? keys : [keys];
  for (const k of arr) {
    if (!k) continue;
    const want = norm(k);
    for (const [p, src] of Object.entries(allAssets)) {
      const base = p.split("/").pop().split(".")[0];
      if (norm(base) === want) return src;
    }
  }
  return null;
};

const getTeamPhoto = (clubName, keys = []) => {
  const exata = getAssetExact(keys);
  if (exata) return exata;
  const club = norm(clubName);
  let fallback = null;
  for (const [p, src] of Object.entries(allAssets)) {
    const b = norm(p.split("/").pop().split(".")[0]);
    const hasClub = b.includes(club);
    const isCrest = b.includes("escudo") || b.includes("logo") || b.includes("badge");
    if (hasClub && !isCrest) {
      const hasHint = b.includes("time") || b.includes("tima") || b.includes("team") || b.includes("hero");
      if (hasHint) return src;
      fallback = fallback || src;
    }
  }
  return fallback;
};

const getCrest = (clubName, keys = []) => {
  const exata = getAssetExact(keys);
  if (exata) return exata;
  const club = norm(clubName);
  for (const [p, src] of Object.entries(allAssets)) {
    const b = norm(p.split("/").pop().split(".")[0]);
    const hasClub = b.includes(club);
    const isCrest = b.includes("escudo") || b.includes("logo") || b.includes("badge");
    if (hasClub && isCrest) return src;
  }
  return getAssetExact([clubName]);
};

/* ===== Times suportados ===== */
const TEAMS = {
  flamengo: {
    nome: "Flamengo",
    cidade: "Rio de Janeiro",
    fundacao: 1995,
    posicao: 5,
    pontos: 24,
    saldo: 15,
    heroKeys: ["TimeFlamengo", "FlamengoHero", "Flamengo"],
    crestKeys: ["EscudoFlamengo", "Flamengo-logo", "Flamengo-escudo", "Flamengo"],
    historia:
      "O futebol feminino do Flamengo teve seus primeiros passos em 1995. Entre 2015 e 2022, o clube manteve a parceria com a Marinha do Brasil (Fla/Marinha), fase que consolidou a estrutura competitiva e resultou em amplo domínio no Campeonato Carioca, além de presenças constantes no Brasileirão A1. Depois, o departamento passou por nova reestruturação para fortalecer captação, base e integração com a área de performance. Em 22/04/2025, a ex-jogadora e técnica Rosana Augusto assumiu o comando, com Ney Melo como auxiliar, propondo um Flamengo agressivo, com posse e jogo apoiado — preservando a identidade competitiva do clube.",
    comissao: { tecnico: "Rosana Augusto", auxiliar: "Ney Melo", preparadorFisico: "—", analistaDesempenho: "—" },
    proximos: [
      { jogo: "Flamengo x São Paulo", comp: "Brasileirão Feminino A1", quando: "Próxima quinta", hora: "20:00" },
      { jogo: "Grêmio x Flamengo", comp: "Brasileirão Feminino A1", quando: "Domingo", hora: "16:00" },
    ],
    elenco: { goleiras: 3, defensoras: 8, "meio-campo": 7, atacantes: 5 },
  },

  santos: {
    nome: "Santos",
    cidade: "Santos",
    fundacao: 1997,
    posicao: 7,
    pontos: 18,
    saldo: 4,
    heroKeys: ["TimeSantos", "SantosTime", "Santos"],
    crestKeys: ["EscudoSantos", "Santos-logo", "Santos-escudo", "Santos"],
    historia:
      "As Sereias da Vila são referência histórica do futebol feminino no Brasil, com base forte e títulos marcantes. O clube é conhecido por revelar talentos e manter um estilo de jogo técnico.",
    proximos: [
      { jogo: "São Paulo x Santos", comp: "Brasileirão Feminino A1", quando: "Domingo", hora: "11:00" },
      { jogo: "Santos x Palmeiras", comp: "Brasileirão Feminino A1", quando: "Quarta", hora: "21:30" },
    ],
    elenco: { goleiras: 2, defensoras: 8, "meio-campo": 7, atacantes: 5 },
  },

  corinthians: {
    nome: "Corinthians",
    cidade: "São Paulo",
    fundacao: 2016,
    posicao: 2,
    pontos: 27,
    saldo: 10,
    heroKeys: ["TimeCorinthians", "CorinthiansHero"],
    crestKeys: ["EscudoCorinthians", "Corinthians-logo", "Corinthians-escudo"],
    historia: "Potência recente no futebol feminino, com títulos nacionais e base forte.",
    proximos: [{ jogo: "Corinthians x Ferroviária", comp: "Brasileirão Feminino A1", quando: "Sábado", hora: "18:00" }],
    elenco: { goleiras: 3, defensoras: 8, "meio-campo": 7, atacantes: 6 },
  },

  "sao-paulo": {
    nome: "São Paulo",
    cidade: "São Paulo",
    fundacao: 1997,
    posicao: 3,
    pontos: 25,
    saldo: 10,
    heroKeys: ["TimeSaoPaulo", "SPFCHero", "SaoPaulo"],
    crestKeys: ["EscudoSaoPaulo", "SPFC-escudo"],
    historia: "Tricolor com tradição e investimentos estáveis no futebol feminino.",
    proximos: [{ jogo: "São Paulo x Santos", comp: "Brasileirão Feminino A1", quando: "Domingo", hora: "11:00" }],
    elenco: { goleiras: 3, defensoras: 8, "meio-campo": 7, atacantes: 6 },
  },

  ferroviaria: {
    nome: "Ferroviária",
    cidade: "Araraquara",
    fundacao: 2001,
    posicao: 4,
    pontos: 24,
    saldo: 17,
    heroKeys: ["TimeFerroviaria"],
    crestKeys: ["EscudoFerroviaria"],
    historia: "Uma das referências históricas do futebol feminino no Brasil.",
    proximos: [{ jogo: "Ferroviária x Palmeiras", comp: "Brasileirão Feminino A1", quando: "Sábado", hora: "16:00" }],
    elenco: { goleiras: 3, defensoras: 7, "meio-campo": 7, atacantes: 5 },
  },

  palmeiras: {
    nome: "Palmeiras",
    cidade: "São Paulo",
    fundacao: 2019,
    posicao: 6,
    pontos: 20,
    saldo: 10,
    heroKeys: ["TimePalmeira", "TimePalmeiras", "PalmeirasFeminino"],
    crestKeys: ["EscudoPalmeiras", "Palmeiras-logo"],
    historia: "Projeto em crescimento, com estrutura e captação de talentos.",
    proximos: [{ jogo: "Palmeiras x Cruzeiro", comp: "Brasileirão Feminino A1", quando: "Sábado", hora: "19:00" }],
    elenco: { goleiras: 3, defensoras: 8, "meio-campo": 7, atacantes: 6 },
  },

  cruzeiro: {
    nome: "Cruzeiro",
    cidade: "Belo Horizonte",
    fundacao: 2019,
    posicao: 1,
    pontos: 35,
    saldo: 10,
    heroKeys: ["TimeCruzeiro", "CruzeiroTime"],
    crestKeys: ["EscudoCruzeiro", "Cruzeiro-logo"],
    historia: "Campanha consistente e defesa sólida, liderando a competição.",
    proximos: [{ jogo: "Cruzeiro x Botafogo", comp: "Brasileirão Feminino A1", quando: "Domingo", hora: "16:00" }],
    elenco: { goleiras: 3, defensoras: 8, "meio-campo": 7, atacantes: 6 },
  },
};

function KPI({ label, value }) {
  return (
    <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-4 md:p-6">
      <div className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">{label}</div>
      <div className="mt-1 text-3xl md:text-4xl font-black text-[#101010]">{value}</div>
    </div>
  );
}

export default function TimePerfil() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = TEAMS[slug];

  if (!data) {
    return (
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Time não encontrado</h1>
        <Link to="/times" className="text-[#7B3AF5] underline mt-2 inline-block">Voltar aos times</Link>
      </main>
    );
  }

  const hero = getTeamPhoto(data.nome, data.heroKeys);
  const crest = getCrest(data.nome, data.crestKeys);

  return (
    <main className="bg-[#FBFBFE] text-[#101010]">
      <section className="relative w-screen left-1/2 -translate-x-1/2 z-0">
        <div className="relative h-[340px] md:h-[420px] lg:h-[480px] overflow-hidden">
          {hero ? (
            <img src={hero} alt={`Foto do ${data.nome}`} className="absolute inset-0 w-full h-full object-cover object-[50%_30%]" />
          ) : (
            <div className="absolute inset-0 bg-gray-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7B3AF5]/28 via-transparent to-transparent mix-blend-multiply" />
          <div className="relative z-10 h-full w-full container mx-auto px-4 md:px-6 lg:px-8 flex items-end pb-6">
            <div className="flex items-center gap-3 md:gap-4">
              {crest && <img src={crest} alt={`${data.nome} escudo`} className="w-12 h-12 md:w-14 md:h-14 object-contain" />}
              <h1 className="text-white text-3xl md:text-5xl font-black drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] hero-title" style={{ fontFamily: '"Bebas Neue", Inter, ui-sans-serif' }}>
                {data.nome}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="h-6 md:h-8 w-full bg-[#FBFBFE] rounded-t-[28px] -mt-4 md:-mt-6" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <KPI label="POSIÇÃO ATUAL" value={data.posicao} />
            <KPI label="PONTOS" value={data.pontos} />
            <KPI label="SALDO DE GOLS" value={data.saldo} />
          </div>

          <section className="py-2 md:py-4">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-3">História do {data.nome}</h2>
            <article className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-4 md:p-6 leading-relaxed text-gray-700">
              <p className="first-letter:text-4xl first-letter:font-black first-letter:mr-1 first-letter:float-left first-letter:text-[#7B3AF5]">
                {data.historia}
              </p>
            </article>
          </section>

          <section className="pb-6 md:pb-8">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-3">Próximos jogos</h2>
            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-4 md:p-6">
              <ul className="divide-y divide-gray-200/70">
                {data.proximos.map((j, i) => (
                  <li key={i} className="py-3 md:py-4 flex items-center justify-between hover:bg-gray-50 rounded-xl px-2 transition-colors">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{j.jogo}</div>
                      <div className="text-sm text-gray-500">{j.comp}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm text-gray-600">{j.quando}</div>
                      <div className="text-xs text-gray-400">{j.hora}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-4 md:p-6">
                <h3 className="text-lg font-extrabold mb-3">Elenco atual</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center justify-between"><span>Goleiras</span><span className="text-gray-500">{data.elenco.goleiras} jogadoras</span></li>
                  <li className="flex items-center justify-between"><span>Defensoras</span><span className="text-gray-500">{data.elenco.defensoras} jogadoras</span></li>
                  <li className="flex items-center justify-between"><span>Meio-campo</span><span className="text-gray-500">{data.elenco["meio-campo"]} jogadoras</span></li>
                  <li className="flex items-center justify-between"><span>Atacantes</span><span className="text-gray-500">{data.elenco.atacantes} jogadoras</span></li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 p-4 md:p-6">
                <h3 className="text-lg font-extrabold mb-3">Comissão técnica</h3>
                <ul className="space-y-3 text-gray-700">
                  <li><div className="font-semibold">Técnica</div><div className="text-sm text-gray-500">{data.comissao?.tecnico || "Técnico(a) principal"}</div></li>
                  <li><div className="font-semibold">Auxiliar técnico</div><div className="text-sm text-gray-500">{data.comissao?.auxiliar || "Auxiliar técnico"}</div></li>
                  <li><div className="font-semibold">Preparador físico</div><div className="text-sm text-gray-500">{data.comissao?.preparadorFisico || "Especialista em condicionamento"}</div></li>
                  <li><div className="font-semibold">Analista de desempenho</div><div className="text-sm text-gray-500">{data.comissao?.analistaDesempenho || "Análise tática e técnica"}</div></li>
                </ul>
              </div>
            </div>
          </section>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-3 rounded-2xl bg-[#7B3AF5] text-white font-extrabold shadow-lg ring-1 ring-black/5 hover:brightness-95 transition"
              aria-label="Voltar"
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
