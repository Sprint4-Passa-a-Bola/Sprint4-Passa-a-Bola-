import React from "react";
import logo from "../assets/logo.png"; // troque se for .svg

const LOGO_H = 90; // px
const LINKS = [
  ["Início", "#/"],
  ["História", "#/historia"],
  ["Campeonatos", "#/campeonatos"],
  ["Times", "#/times"],
  ["Notícias", "#/noticias"],
  ["Inscrições", "#/inscricoes"],
];

export default function Header() {
  const isActive = (href) => {
    const h = window.location.hash || "#/";
    return href === "#/" ? h === "#/" : h.startsWith(href);
  };

  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "#fff",
    borderBottom: "1px solid #eee",
  };

  // FULL width + padding pequeno => logo no canto
  const bar = {
    width: "100%",
    margin: 0,
    padding: "4px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  };

  const brand = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "#111",
    lineHeight: 1,
  };

  const nav = { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" };
  const linkBase = {
    textDecoration: "none",
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 0.6,
    padding: "8px 10px",
    borderRadius: 8,
    color: "#111",
    border: "1px solid transparent",
    lineHeight: 1,
  };

  return (
    <header style={wrap}>
      <style>{`#app-logo{height:${LOGO_H}px!important;width:auto!important;display:block}`}</style>
      <div style={bar}>
        {/* logo no canto esquerdo */}
        <a href="#/" style={brand}>
          <img id="app-logo" src={logo} alt="Passa a Bola" />
          <strong style={{ fontSize: Math.max(16, Math.round(LOGO_H * 0.3)) }}>Passa a Bola</strong>
        </a>

        <nav style={nav}>
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                ...linkBase,
                background: isActive(href) ? "#EFE7FF" : "transparent",
                color: isActive(href) ? "#7B3AF5" : "#111",
                borderColor: isActive(href) ? "#E1D5FF" : "transparent",
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
