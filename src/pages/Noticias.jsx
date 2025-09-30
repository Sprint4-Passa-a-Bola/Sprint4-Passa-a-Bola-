// src/pages/Noticias.jsx
import React from "react";

// Ajuste os paths das imagens se necessário
import destaqueImg from "../assets/TimeCruzeiro.jpg";
import cardDirTopo from "../assets/Juventude.png";
import cardDirBase from "../assets/feminino.jpg";

export default function Noticias() {
  return (
    <main className="w-full bg-slate-100">
      <section className="w-full max-w-[1340px] mx-auto px-6 md:px-8 py-10 md:py-12">
        {/* Título + Slogan */}
        <h1 className="text-center uppercase font-black tracking-tight text-3xl md:text-5xl lg:text-6xl text-slate-900">
          últimas notícias
        </h1>
        <p className="mt-2 text-center text-[11px] md:text-xs uppercase tracking-[0.25em] text-slate-500">
          Fique por dentro do que acontece no mundo do futebol feminino brasileiro
        </p>

        {/* Grid principal */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cardzão à esquerda */}
          <article className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-[320px] md:h-[420px] lg:h-[460px] overflow-hidden">
              <img
                src={destaqueImg}
                alt="Cruzeiro goleia, segue invicto e garante liderança"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-5 md:px-7 lg:px-8 py-5 md:py-6">
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <span className="inline-block px-2.5 py-1 rounded-md bg-purple-600 text-white font-semibold">
                  Destaque
                </span>
                <span className="text-slate-500">07 de junho, 2025</span>
              </div>

              <h2 className="mt-3 text-[28px] md:text-[40px] lg:text-[54px] leading-[1.05] font-black uppercase text-slate-900">
                Cruzeiro goleia, segue invicto e garante
                <br className="hidden lg:block" />
                liderança no Brasileirão feminino
              </h2>

              <p className="mt-3 text-slate-600 md:text-lg leading-relaxed">
                O Cruzeiro confirmou sua superioridade no Brasileiro Feminino com uma goleada por 5 a 1
                sobre o 3B da Amazônia neste sábado (7), no Gregorão, em Contagem. A vitória assegurou
                matematicamente a liderança da primeira fase, com duas rodadas de antecedência.
              </p>

              <div className="mt-3 flex justify-end">
                <a
                  href="#/noticias/cruzeiro-goleia"
                  className="text-rose-500 hover:text-rose-600 visited:text-rose-500 font-bold hover:underline"
                >
                  Ler mais →
                </a>
              </div>
            </div>
          </article>

          {/* Coluna direita com 2 cards */}
          <div className="space-y-8">
            {/* Card topo */}
            <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-[180px] md:h-[210px] overflow-hidden">
                <img
                  src={cardDirTopo}
                  alt="Juventude conquista vitória importante no Brasileiro Feminino"
                  className="w-full h-full object-cover object-[50%_18%]"
                />
              </div>

              <div className="px-4 md:px-5 py-4">
                <div className="flex items-center gap-2 text-[11px] md:text-xs">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-amber-400 text-slate-900 font-bold">
                    COPA DO BRASIL
                  </span>
                  <span className="text-slate-500">08 de junho, 2025</span>
                </div>

                <h3 className="mt-2 text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                  Juventude conquista vitória importante no Brasileiro Feminino
                </h3>
                <p className="mt-1 text-slate-600 text-sm md:text-base">
                  Esmeraldas superaram o Sport e abriram distância de dois pontos da zona de rebaixamento…
                </p>

                <a
                  href="#/noticias/juventude"
                  className="mt-2 inline-block text-rose-500 hover:text-rose-600 visited:text-rose-500 font-bold text-sm hover:underline"
                >
                  Ler mais →
                </a>
              </div>
            </article>

            {/* Card base */}
            <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-[180px] md:h-[210px] overflow-hidden">
                <img
                  src={cardDirBase}
                  alt="Números do futebol feminino brasileiro impressionam"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-4 md:px-5 py-4">
                <div className="flex items-center gap-2 text-[11px] md:text-xs">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-fuchsia-600 text-white font-bold">
                    ESTATÍSTICAS
                  </span>
                  <span className="text-slate-500">09 de junho, 2025</span>
                </div>

                <h3 className="mt-2 text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                  Números do futebol feminino brasileiro impressionam
                </h3>
                <p className="mt-1 text-slate-600 text-sm md:text-base">
                  Crescimento de 40% no público dos estádios marca temporada histórica…
                </p>

                <a
                  href="#/noticias/estatisticas-2025"
                  className="mt-2 inline-block text-rose-500 hover:text-rose-600 visited:text-rose-500 font-bold text-sm hover:underline"
                >
                  Ler mais →
                </a>
              </div>
            </article>
          </div>
        </div>

        {/* CTA central — magenta (igual ao chip) + texto SEMPRE branco */}
        <div className="flex justify-center mt-6">
          <a
            href="#/noticias"
            className="inline-block rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-3 font-extrabold tracking-wide shadow-sm transition-colors 
                       !text-white hover:!text-white visited:!text-white focus:!text-white active:!text-white no-underline"
            style={{ color: "#fff" }}
          >
            Ver Todas as Notícias
          </a>
        </div>
      </section>
    </main>
  );
}