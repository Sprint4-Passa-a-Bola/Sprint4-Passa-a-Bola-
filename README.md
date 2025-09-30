# ⚽ Passa a Bola 💜

Plataforma digital feita para **dar voz e visibilidade ao futebol feminino**.  
O **Passa a Bola** conecta jogadoras, clubes, torcedores e organizadores de campeonatos em um só lugar.  

Além de ser um **projeto acadêmico da FIAP**, o site também é uma **iniciativa social** para reforçar a importância e a visibilidade do **futebol feminino** como movimento cultural e esportivo.

---

## 👥 Integrantes
- Luis Gustavo Vasconcelos Costa — RM 566023  
- Anna Clara Ruggeri da Silva — RM 565553  
- Matheus Cerciari Reis — RM 565817  
- Henrique Vicente Vicenterm — RM 564116  
- Arthur Gaspare Gil — RM 555746  

---

## 🌍 Links Importantes
- 🔗 **Deploy (Vercel):** [https://sprint4-passa-a-bola.vercel.app/#/login](https://sprint4-passa-a-bola.vercel.app/#/login)  
  > O projeto usa **HashRouter**, portanto o link correto contém `#/login`.  
- 🏢 **Repositório:** [GitHub do projeto](https://github.com/Sprint4-Passa-a-Bola/Sprint4-Passa-a-Bola-/tree/main)

---

## 🎯 Objetivo do Projeto
O futebol feminino ainda sofre com **baixa cobertura e engajamento**.  
O *Passa a Bola* foi criado para:
- **Centralizar** informações de times, jogadoras e campeonatos.
- **Facilitar inscrições** para atletas de forma acessível.
- **Oferecer uma vitrine** para aumentar a **visibilidade do futebol feminino**.
- **Criar comunidade e engajamento**, abrindo portas para patrocínios e apoio.

---

## ✨ Funcionalidades Implementadas
- **Redirecionamento automático para a tela de Login** (`/#/login`) caso o usuário não esteja autenticado.  
- **Login** com mock de autenticação (senha padrão `1234`) e expiração automática de sessão após 2 horas.  
- **Controle de sessão** usando `localStorage` (salva token, email e timestamp).  
- **Times**:
  - Lista dinâmica consumindo dados de uma API JSON (mock) no `/public/data/teams.json`.  
  - Cards com **escudo e foto do time**, dados de cidade e fundação.  
  - Botão **“Ver Perfil Completo”**.  
- **Distribuição de times por cidade**: gráfico tipo **donut chart** com legenda percentual.  
- **Perfis de Times** com histórico e comissão técnica.  
- **Campeonatos**:
  - Tabela do Brasileirão Feminino A1.  
  - Próximos jogos da Copa do Brasil Feminina.  
  - Acesso rápido para **“Ver Tabela Completa”** e **“Ver Chaveamento Completo”**.  
- **Notícias e Resultados Recentes**.  
- **Formulário de Inscrições** para atletas com salvamento em `localStorage`.  
- **Menu Responsivo** (desktop + mobile) com botão de **logout**.  

---

## 🔑 Fluxo de Autenticação
- Ao abrir o site, se não houver sessão ativa, o usuário é redirecionado para **`/#/login`**.  
- O login simula autenticação e salva em `localStorage`: `{ ok, token, email, ts }`.  
- A sessão expira automaticamente após **2 horas** (removida no próximo acesso).  
- O botão **“Sair”** limpa o `localStorage` e volta para a tela de login.

---

## 🛠️ Tecnologias Usadas
- ⚡ **Vite + React + React Router (HashRouter)**  
- 🎨 **Tailwind CSS**  
- 🔎 **ESLint**  
- 📦 **LocalStorage** para persistência simulada de dados  
- ☁️ **Vercel** para deploy contínuo

---

## 🌟 Destaques Técnicos
- 🔐 **Proteção de rotas:** páginas privadas só carregam após login.  
- 🔄 **Redirecionamento inicial:** `useEffect` garante que a raiz sempre leva para `/#/login` se não houver sessão.  
- 📊 **Gráfico Donut** (distribuição de times por cidade) feito sem bibliotecas externas.  
- ♿ **Princípios A11y/W3C:** alt nos logos, labels nos campos de formulário, navegação por teclado.  
- 📱 **Design responsivo**: menus adaptados para desktop e mobile.  

---

## 📣 Impacto Social
O **Passa a Bola** é mais do que um projeto acadêmico. Ele busca:
- Aumentar a visibilidade de jogadoras, clubes e competições.  
- Engajar torcedores e patrocinadores.  
- Apoiar a luta por igualdade e oportunidades no esporte feminino.  

---

## 📄 Licença
Uso **acadêmico e social** — FIAP.  
Não destinado a uso comercial.
