import React from "react";
import heroImg from "../assets/hero.jpg";
import Campeonatos from "./Campeonatos";

export default function Inicio() {
  return (
    <main className="bg-[#FBFBFE] text-[#101010] overflow-x-hidden">
      <section className="relative w-screen left-1/2 -translate-x-1/2 mt-4">
        <div className="relative h-[520px] md:h-[560px] lg:h-[600px] overflow-hidden">
          <img
            src={heroImg}
            alt="Gramado de futebol"
            className="absolute inset-0 w-full h-full object-cover object-[88%_52%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-black/14 to-transparent" />
          <div className="relative z-10 h-full w-full px-[4vw] md:px-[5vw] flex items-center">
            <div className="max-w-[78ch]">
              <h1
                className="tracking-wide text-[clamp(52px,8vw,120px)] leading-[0.9]"
                style={{
                  fontFamily:
                    '"Bebas Neue", Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                  color: "#7B3AF5",
                }}
              >
                Passa a Bola
              </h1>
              <p className="mt-3 text-white font-extrabold uppercase tracking-[0.02em] text-[clamp(16px,2.2vw,28px)] max-w-[60rem]">
                Acompanhe a história, os campeonatos & as conquistas do futebol feminino no Brasil.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#campeonatos"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-extrabold uppercase tracking-wide bg-[#FADF63] !text-[#101010] hover:bg-[#FBEA9C] transition no-underline"
                >
                  Ver campeonatos
                </a>
                <a
                  href="#/historia"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-extrabold uppercase tracking-wide bg-[#7B3AF5] !text-white hover:brightness-95 transition no-underline"
                >
                  Conhecer história
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-screen left-1/2 -translate-x-1/2 mt-8 md:mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-[2vw]">
          <div className="rounded-2xl p-8 text-center bg-[#7B3AF5] text-white shadow-[0_16px_30px_rgba(123,58,245,.25)]">
            <div className="text-4xl md:text-5xl font-extrabold leading-none">8+</div>
            <div className="mt-2 text-sm md:text-base text-white/90">Times Cadastrados</div>
          </div>
          <div className="rounded-2xl p-8 text-center bg-white shadow-[0_12px_28px_rgba(10,10,20,.06)]">
            <div className="text-4xl md:text-5xl font-extrabold leading-none">3</div>
            <div className="mt-2 text-sm md:text-base text-[#6B7280]">Campeonatos</div>
          </div>
          <div className="rounded-2xl p-8 text-center bg-white shadow-[0_12px_28px_rgba(10,10,20,.06)]">
            <div className="text-4xl md:text-5xl font-extrabold leading-none">197+</div>
            <div className="mt-2 text-sm md:text-base text-[#6B7280]">Jogadoras</div>
          </div>
          <div className="rounded-2xl p-8 text-center bg-[#101010] text-white shadow-[0_16px_30px_rgba(16,16,16,.24)]">
            <div className="text-4xl md:text-5xl font-extrabold leading-none">10+</div>
            <div className="mt-2 text-sm md:text-base text-white/90">Partidas</div>
          </div>
        </div>
      </section>

      <Campeonatos embedded />
      <div className="w-full min-h-screen"></div>
    </main>
  );
}
