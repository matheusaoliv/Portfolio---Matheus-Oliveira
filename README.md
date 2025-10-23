# Portfólio — Matheus Oliveira

Site ao vivo
- https://matheusaoliv.github.io/Portfolio---Matheus-Oliveira/

Descrição
- Portfólio pessoal desenvolvido com React + Vite + TypeScript e estilizado com Tailwind CSS. Animações com Framer Motion e roteamento com React Router. O projeto já está preparado para deploy automático no GitHub Pages via GitHub Actions.

Principais recursos
- UI moderna com Tailwind CSS
- Componentes reutilizáveis (Button, Card, Badge)
- Animações suaves (Framer Motion)
- Roteamento SPA (React Router)
- Deploy contínuo no GitHub Pages (Actions)

Stack
- React 19, Vite 6, TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Lucide React (ícones)
- Utilitários: clsx, tailwind-merge
- Validação: zod
- Infra: GitHub Actions para Pages

Requisitos
- Node.js 20+ e npm

Como rodar localmente (Windows)
- Opção 1 — usando o script pronto:
  1) Dê dois cliques em `abrir_portfolio.bat` na raiz do projeto, ou rode no cmd:
  ```cmd
  D:
  cd "D:\download\Portfolio - Matheus Oliveira"
  abrir_portfolio.bat
  ```
  - Isso instala dependências (se necessário), inicia o Vite e abre o navegador.
- Opção 2 — via npm:
  ```cmd
  D:
  cd "D:\download\Portfolio - Matheus Oliveira"
  npm install
  npm run dev -- --open
  ```

Build e preview de produção
```cmd
npm run build
npx vite preview --open
```

Scripts úteis
- `npm run dev` — inicia o servidor de desenvolvimento (Vite)
- `npm run build` — build de produção
- `npm run lint` — lint do projeto

Deploy (GitHub Pages)
- O deploy é automático via GitHub Actions em cada push para a branch `main`.
- A action prepara o `base` do Vite corretamente para Pages e cria `404.html` (fallback SPA).
- Após o build, os artefatos são publicados e o site fica disponível em:
  - https://matheusaoliv.github.io/Portfolio---Matheus-Oliveira/

Deploy (Vercel)
- Este projeto também está pronto para deploy na Vercel como site estático (Vite).
- Arquivo de configuração: `vercel.json` (usa `@vercel/static-build` com `distDir: dist/client` e rotas SPA).

Via CLI (Windows)
- Pré-requisito: Node.js e npm.
- Passos:
  ```cmd
  D:
  cd "D:\download\Portfolio - Matheus Oliveira"
  deploy_vercel.bat
  ```
  - O script fará login (`npx vercel login`), link (`npx vercel link`) e deploy de produção (`npx vercel --prod`).
  - Opcionalmente, ele pode rodar `npm ci && npm run build` local antes do deploy.

Via GitHub (CI da Vercel)
- No dashboard da Vercel, clique em “Add New…” > “Project”
- Conecte sua conta do GitHub e selecione o repositório `Portfolio---Matheus-Oliveira`
- Defina:
  - Framework Preset: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist/client`
  - Root Directory: (raiz do repositório)
- Deploys automáticos serão disparados a cada push na `main`.

Estrutura do projeto (resumo)
```
.
├─ index.html
├─ package.json
├─ vite.config.ts
├─ .github/workflows/deploy.yml
├─ vercel.json
├─ src/
│  ├─ react-app/
│  │  ├─ App.tsx
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  ├─ components/ui/ (Button, Card, Badge)
│  │  ├─ lib/utils.ts
│  │  └─ pages/Home.tsx
│  ├─ shared/types.ts
│  └─ worker/index.ts
├─ abrir_portfolio.bat
└─ deploy_vercel.bat
```

Problemas comuns
- Porta em uso: o Vite troca a porta automaticamente e ainda assim abre o navegador.
- npm não reconhecido: instale o Node.js (https://nodejs.org/) e reabra o terminal.

Contribuição
- Issues e PRs são bem-vindos. Para alterações maiores, abra primeiro uma issue descrevendo a proposta.

Licença
- Veja o arquivo `LICENSE` na raiz do projeto.
