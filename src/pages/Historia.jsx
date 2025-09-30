// src/pages/Historia.jsx
import React from "react";
import heroImg from "../assets/historia.jpg";    // fundo do herói
import imgProibicao from "../assets/proibicao.jpg";
import imgRevogacao from "../assets/revogacao.jpg";
import imgCriacao from "../assets/criacao.jpg";
import imgMarta from "../assets/marta.jpg";

export default function Historia() {
  return (
    <main className="w-full min-h-screen bg-white">

      {/* HERO full-bleed com card translúcido */}
      <section
        className="relative h-[420px] md:h-[520px] overflow-hidden w-screen flex items-center"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/55 via-purple-500/35 to-amber-400/55" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,transparent_0%,transparent_60%,rgba(0,0,0,0.35)_100%)]" />

        <div className="relative z-10 w-full px-6">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block max-w-3xl rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/15 shadow-xl px-6 py-6 md:px-8 md:py-8">
              {/* TÍTULO EM BRANCO */}
              <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight [text-wrap:balance] drop-shadow-sm">
                Nossa História
              </h1>
              <p className="mt-4 md:mt-5 text-white/90 text-lg md:text-2xl leading-relaxed [text-wrap:balance]">
                Do primeiro post ao estádio lotado: como o <strong>Passa a Bola</strong> virou
                ponto de encontro para quem vive o futebol feminino — e como essa trajetória
                se conecta com a evolução do esporte no Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE O PASSA A BOLA */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-900 [text-wrap:balance]">
          Passa a Bola: de um perfil apaixonado a uma comunidade
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 md:px-8 py-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">Como começou</h3>
            <p className="mt-3 text-slate-600">
              O <strong>Passa a Bola</strong> nasceu como um espaço independente para registrar
              jogos, histórias e bastidores do futebol feminino. De posts no feed a coberturas
              em campo, a ideia sempre foi dar visibilidade a quem faz o jogo acontecer.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 md:px-8 py-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">Missão • O que fazemos</h3>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>• Cobertura de campeonatos nacionais e regionais;</li>
              <li>• Conteúdos históricos e educativos;</li>
              <li>• Destaque para atletas, comissões e projetos de base;</li>
              <li>• Incentivo a mais meninas nos gramados.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 md:px-8 py-8">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">Valores</h3>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>• Respeito e representatividade;</li>
              <li>• Informação responsável;</li>
              <li>• Amor pelo jogo e por quem joga;</li>
              <li>• Comunidade acima de tudo.</li>
            </ul>
          </article>
        </div>

        {/* MARCOS EXPLICADOS + IMAGENS */}
        <h3 className="mt-16 text-center text-3xl md:text-4xl font-extrabold text-slate-900 [text-wrap:balance]">
          Marcos que mudaram a história
        </h3>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PROIBIÇÃO */}
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={imgProibicao}
                alt="Proibição do futebol feminino no Brasil (1941–1979)"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-8 py-8">
              <div className="flex items-baseline gap-3">
                <div className="text-4xl md:text-5xl font-extrabold text-amber-400">38</div>
                <div className="text-slate-500">anos de proibição (1941–1979)</div>
              </div>
              <p className="mt-4 text-slate-600">
                Em 1941, o Conselho Nacional de Desportos proibiu mulheres de praticarem
                “esportes incompatíveis com sua natureza”, incluindo o futebol. Mesmo assim,
                partidas continuaram de forma precária e marginalizada, sustentadas por
                resistência, afeto e teimosia de quem amava o jogo.
              </p>
            </div>
          </article>

          {/* REVOGAÇÃO */}
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={imgRevogacao}
                alt="Revogação do banimento em 1979"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-8 py-8">
              <div className="flex items-baseline gap-3">
                <div className="text-4xl md:text-5xl font-extrabold text-amber-400">1979</div>
                <div className="text-slate-500">revogação do banimento</div>
              </div>
              <p className="mt-4 text-slate-600">
                A revogação oficial da proibição abriu caminho para registro de equipes e
                organização de competições. Ainda faltavam estrutura, calendário e investimento,
                mas o passo jurídico recolocou o futebol feminino na trilha do reconhecimento.
              </p>
            </div>
          </article>

          {/* CRIAÇÃO DO BRASILEIRÃO */}
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={imgCriacao}
                alt="Criação do Brasileirão Feminino em 2013"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-8 py-8">
              <div className="flex items-baseline gap-3">
                <div className="text-4xl md:text-5xl font-extrabold text-amber-400">2013</div>
                <div className="text-slate-500">criação do Brasileirão Feminino</div>
              </div>
              <p className="mt-4 text-slate-600">
                A CBF instituiu o Brasileirão Feminino, marco de profissionalização e
                ampliação do calendário. Vieram as séries A1/A2, categorias de base e
                maior presença de clubes tradicionais — uma virada na visibilidade da modalidade.
              </p>
            </div>
          </article>

          {/* MARTA 6× */}
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={imgMarta}
                alt="Marta, 6× melhor do mundo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-8 py-8">
              <div className="flex items-baseline gap-3">
                <div className="text-4xl md:text-5xl font-extrabold text-amber-400">6×</div>
                <div className="text-slate-500">Marta melhor do mundo</div>
              </div>
              <p className="mt-4 text-slate-600">
                Eleita em 2006, 2007, 2008, 2009, 2010 e 2018, Marta tornou-se símbolo global
                de excelência. Seus prêmios empurraram a pauta do futebol feminino para o centro
                da conversa e inspiraram gerações.
              </p>
            </div>
          </article>
        </div>

        {/* HISTÓRIA DO FUTEBOL FEMININO */}
        <h3 className="mt-16 text-center text-3xl md:text-4xl font-extrabold text-slate-900 [text-wrap:balance]">
          Uma história que nunca parou de lutar
        </h3>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 md:px-8 py-8">
            <h4 className="text-2xl font-extrabold text-slate-900">Os Primeiros Passos</h4>
            <p className="mt-3 text-slate-600">
              No fim do século XIX, mulheres já jogavam bola, mesmo contra a maré. Na Inglaterra,
              durante a Primeira Guerra, o <em>Dick, Kerr’s Ladies</em> arrastou multidões e provou
              a força do futebol feminino.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 md:px-8 py-8">
            <h4 className="text-2xl font-extrabold text-slate-900">O Baque do Machismo</h4>
            <p className="mt-3 text-slate-600">
              Em 1921, a FA baniu o futebol feminino de seus gramados, chamando-o de “inadequado”.
              A decisão ecoou em vários países e atrasou gerações — mas não apagou a chama.
            </p>
          </article>
        </div>
      </section>

      {/* CALLOUT FINAL */}
      <section
        className="relative w-screen py-16 px-6 border-t border-slate-200 shadow-sm bg-gradient-to-r from-purple-100 to-amber-50"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="text-center max-w-5xl mx-auto">
          <h4 className="text-2xl md:text-3xl font-extrabold text-slate-900">O Legado Continua</h4>
          <p className="mt-5 text-slate-600 md:text-lg">
            Cada partida, cada gol, cada conquista é um passo a mais na construção de um futuro
            onde o talento feminino no futebol seja celebrado e valorizado como merece.
          </p>
        </div>
      </section>
    </main>
  );
}
