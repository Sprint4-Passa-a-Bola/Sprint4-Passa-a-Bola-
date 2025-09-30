// src/pages/Times.jsx
import React from "react";
import { Link } from "react-router-dom";

const assetsLower = import.meta.glob("../assets/**/*.{png,jpg,jpeg,svg,webp}", { eager: true, import: "default" });
const assetsUpper = import.meta.glob("../assets/**/*.{PNG,JPG,JPEG,SVG,WEBP}", { eager: true, import: "default" });
const allAssets = { ...assetsLower, ...assetsUpper };

const norm = (s = "") =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
const baseName = (path = "") => (path.split("/").pop() || "").replace(/\.(png|jpe?g|svg|webp)/gi, "");

const getAssetExact = (keyOrKeys) => {
  const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
  for (const key of keys) {
    if (!key) continue;
    const want = norm(key);
    for (const [path, src] of Object.entries(allAssets)) {
      if (norm(baseName(path)) === want) return src;
    }
  }
  return null;
};

const getTeamPhoto = (clubName, photoKeys = []) => {
  const exata = getAssetExact(photoKeys);
  if (exata) return exata;
  const club = norm(clubName);
  let candidato = null;
  for (const [path, src] of Object.entries(allAssets)) {
    const b = norm(baseName(path));
    const hasClub = b.includes(club);
    const isCrestLike =
      b.includes("escudo") || b.includes("logo") || b.includes("badge") || b.includes("brasao");
    if (hasClub && !isCrestLike) {
      const hasHint = b.includes("time") || b.includes("tima") || b.includes("team");
      if (hasHint) return src;
      candidato = candidato || src;
    }
  }
  return candidato;
};

const getCrest = (clubName, crestKeys = []) => {
  const byKeys = getAssetExact(crestKeys);
  if (byKeys) return byKeys;
  const club = norm(clubName);
  for (const [path, src] of Object.entries(allAssets)) {
    const b = norm(baseName(path));
    const hasClub = b.includes(club);
    const isCrestLike =
      b.includes("escudo") || b.includes("logo") || b.includes("badge") || b.includes("brasao");
    if (hasClub && isCrestLike) return src;
  }
  return getAssetExact([clubName]);
};

/* --- Card de Time --- */
function TeamCard({ item }) {
  const foto = getTeamPhoto(item.nome, item.fotoKey);
  const logo = getCrest(item.nome, item.crestKey);
  return (
    <article className="bg-white rounded-2xl shadow-[0_10px_24px_rgba(10,10,20,.06)] overflow-hidden flex flex-col">
      <div className="w-full h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden">
        {foto ? (
          <img
            src={foto}
            alt={`Foto do ${item.nome}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 grid place-items-center text-gray-500 text-center px-4">
            (adicione imagem com nome:{" "}
            <span className="font-semibold">
              {Array.isArray(item.fotoKey) ? item.fotoKey.join(", ") : item.fotoKey}
            </span>
            )
          </div>
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-start gap-3">
          {logo && (
            <img
              src={logo}
              alt={`${item.nome} logo`}
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
          )}
          <div>
            <h3
              className="text-[32px] leading-8 md:text-[36px] md:leading-9 font-black"
              style={{ fontFamily: '"Bebas Neue", Inter, ui-sans-serif' }}
            >
              {item.nome}:
            </h3>
            <div className="text-[13px] md:text[14px] font-black tracking-wide uppercase text-[#111]">
              {item.cidade} · Fundado em {item.fundacao}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to={`/time/${item.slug}`}
            className="w-full inline-flex justify-center bg-white text-[#7B3AF5] border border-[#E8E8EF] rounded-xl py-3 font-extrabold hover:shadow-md transition no-underline"
          >
            Ver Perfil Completo
          </Link>
        </div>
      </div>
    </article>
  );
}

/* --- Donut & legenda --- */
function Donut({ data, colors, size = 240, thickness = 26 }) {
  const total = data.reduce((a, b) => a + Number(b.value || 0), 0);
  let acc = 0;
  const segments = data.map((d, i) => {
    const deg = total ? (Number(d.value || 0) / total) * 360 : 0;
    const seg = `${colors[i % colors.length]} ${acc}deg ${acc + deg}deg`;
    acc += deg;
    return seg;
  });
  const gradient = total
    ? `conic-gradient(${segments.join(", ")})`
    : "conic-gradient(#E5E7EB 0deg 360deg)";
  const hole = size - thickness * 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.06)]"
        style={{ width: size, height: size, background: gradient }}
      />
      <div
        className="absolute inset-0 m-auto rounded-full bg-white grid place-items-center text-sm text-gray-800 shadow-[0_6px_20px_rgba(17,17,17,.06)]"
        style={{ width: hole, height: hole }}
      >
        {total ? (
          <div className="text-center leading-none">
            <div className="text-2xl font-black">{total}</div>
            <div className="text-[11px] tracking-wide uppercase text-gray-500">no total</div>
          </div>
        ) : (
          <span>Sem dados</span>
        )}
      </div>
    </div>
  );
}

function PrettyLegend({ data }) {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
      {data.map((it, i) => (
        <li
          key={i}
          className="flex items-center gap-3 rounded-xl border border-[#ECECF3] bg-white/80 px-3 py-2 shadow-[0_4px_14px_rgba(10,10,20,.05)]"
        >
          <span
            className="inline-block w-3.5 h-3.5 rounded"
            style={{ background: it.color }}
          />
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{it.label}</div>
            <div className="text-[11px] text-gray-500">{it.percent.toFixed(0)}%</div>
          </div>
          <span className="ml-auto text-[12px] font-semibold text-gray-800 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
            {it.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Times() {
  const [top, setTop] = React.useState([]);
  const [bottom, setBottom] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [erro, setErro] = React.useState("");
  const [busca, setBusca] = React.useState("");
  const [ordenar, setOrdenar] = React.useState("nome");

  React.useEffect(() => {
    fetch("/data/teams.json")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar times");
        return res.json();
      })
      .then((data) => {
        // mantém a separação TOP e BOTTOM (3 primeiros no TOP, resto no BOTTOM)
        setTop(data.slice(0, 3));
        setBottom(data.slice(3));
      })
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  const matches = (t) => t.nome.toLowerCase().includes(busca.trim().toLowerCase());

  const sortFn = React.useCallback(
    (a, b) => {
      if (ordenar === "nome") return a.nome.localeCompare(b.nome, "pt-BR");
      if (ordenar === "cidade") return a.cidade.localeCompare(b.cidade, "pt-BR");
      if (ordenar === "fundacao_desc") return b.fundacao - a.fundacao;
      return 0;
    },
    [ordenar]
  );

  const topFiltered = React.useMemo(
    () => top.filter(matches).slice().sort(sortFn),
    [top, busca, sortFn]
  );
  const bottomFiltered = React.useMemo(
    () => bottom.filter(matches).slice().sort(sortFn),
    [bottom, busca, sortFn]
  );

  const porCidade = React.useMemo(() => {
    const cont = new Map();
    [...topFiltered, ...bottomFiltered].forEach((t) => {
      cont.set(t.cidade, (cont.get(t.cidade) || 0) + 1);
    });
    return Array.from(cont.entries()).map(([label, value]) => ({ label, value }));
  }, [topFiltered, bottomFiltered]);

  const PIE_COLORS = ["#7B3AF5", "#FADF63", "#101010", "#1D6FA3", "#E64545", "#2E7D32", "#FF7AA2", "#33B5E5"];
  const legendData = React.useMemo(() => {
    const total = porCidade.reduce((a, b) => a + Number(b.value || 0), 0) || 1;
    return porCidade
      .map((d, i) => ({
        ...d,
        color: PIE_COLORS[i % PIE_COLORS.length],
        percent: (Number(d.value || 0) / total) * 100,
      }))
      .sort((a, b) => b.value - a.value);
  }, [porCidade]);

  if (loading) return <p className="text-center py-10">Carregando times...</p>;
  if (erro) return <p className="text-center py-10 text-red-600">Erro: {erro}</p>;

  return (
    <main className="bg-[#F5F6FF]">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="text-center mb-6 md:mb-8">
          <h1
            className="text-[44px] md:text-[56px] leading-[0.9] font-black"
            style={{ fontFamily: '"Bebas Neue", Inter, ui-sans-serif' }}
          >
            Times em Destaque
          </h1>
          <p className="text-gray-600 mt-2">Conheça os principais times do futebol feminino</p>
        </header>

        {/* Filtros/Ordenação */}
        <div className="mb-8 rounded-2xl bg-white/90 backdrop-blur p-4 md:p-5 shadow-[0_12px_28px_rgba(10,10,20,.06)] ring-1 ring-black/5">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar time por nome…"
              className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
            />
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="nome">Ordenar: A–Z</option>
              <option value="cidade">Ordenar: Cidade</option>
              <option value="fundacao_desc">Ordenar: Fundação (mais recente)</option>
            </select>
            {(busca || ordenar !== "nome") && (
              <button
                type="button"
                onClick={() => {
                  setBusca("");
                  setOrdenar("nome");
                }}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Cards TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topFiltered.map((t) => (
            <TeamCard key={t.slug} item={t} />
          ))}
        </div>

        {/* Cards BOTTOM */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bottomFiltered.map((t) => (
            <TeamCard key={t.slug} item={t} />
          ))}
        </div>

        {!!porCidade.length && (
          <section className="mt-12">
            <div className="rounded-3xl bg-white/90 backdrop-blur p-5 md:p-6 shadow-[0_20px_40px_rgba(10,10,20,.08)] ring-1 ring-black/5">
              <h2 className="text-xl md:text-2xl font-black mb-4">
                Distribuição de Times por Cidade
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Donut data={porCidade} colors={PIE_COLORS} />
                <div className="w-full max-w-xl">
                  <PrettyLegend data={legendData} />
                </div>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
