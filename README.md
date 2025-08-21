# James — Painel do Agente de Voz

Interface futurista em React + Vite que exibe um painel de status e integra o widget de conversa por voz da ElevenLabs (Convai). Ideal para demonstrar e operar um agente de voz em tempo real, com métricas visuais e elementos holográficos.

## ✨ Recursos
- **Integração com ElevenLabs Convai**: widget embutido em `index.html` para voz no navegador.
- **UI moderna**: Tailwind CSS, tipografia Inter/Orbitron e efeitos holográficos.
- **Componentização**: componentes reutilizáveis (`StatusPanel`, `SystemMetric`, `HolographicElement`, `CircularProgress`).
- **Feedback em tempo real (mock)**: métricas de CPU/RAM simuladas para visualização.
- **Pronto para produção**: build estático via Vite.

## 📦 Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react (ícones)

## ✅ Requisitos
- Node.js 18+ (recomendado LTS)
- npm, pnpm ou yarn
- Uma conta ElevenLabs e um `agent-id` do Convai

## 🚀 Começando
1. Clone o repositório
```bash
git clone <url-do-repo>
cd james_painel_de_voz
```
2. Instale as dependências
```bash
npm install
# ou: pnpm install | yarn
```
3. Configure o agente da ElevenLabs
- Abra `index.html` e substitua o valor do atributo `agent-id` pelo ID do seu agente:
  - Arquivo: `index.html`
  - Elemento: `<elevenlabs-convai agent-id="agent_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />`
4. Rode em desenvolvimento
```bash
npm run dev
```
Acesse a URL indicada pelo Vite (geralmente `http://localhost:5173`).

## 🧰 Scripts
- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera o build de produção em `dist/`
- `npm run preview`: serve o build para inspeção local
- `npm run lint`: executa o ESLint

## 🗂️ Estrutura do projeto
```
.
├─ index.html                # Widget ElevenLabs e root da aplicação
├─ src/
│  ├─ App.tsx               # Layout e composição do painel
│  ├─ main.tsx              # Bootstrap do React
│  ├─ index.css             # Estilos globais e utilitários Tailwind
│  └─ components/
│     ├─ StatusPanel.tsx    # Cartões de status com métricas
│     ├─ SystemMetric.tsx   # Badge/medidor compacto fixo no rodapé
│     ├─ HolographicElement.tsx  # Anéis/efeitos holográficos
│     └─ CircularProgress.tsx    # Indicador circular com porcentagem
├─ tailwind.config.js       # Configuração do Tailwind
├─ vite.config.ts           # Configuração do Vite/React
└─ package.json             # Dependências e scripts
```

## ⚙️ Configuração e personalização
- **Cores e tema**: ajuste `tailwind.config.js` (chave `theme.extend`) para temas próprios.
- **Fontes**: `Inter` e `Orbitron` são importadas em `index.html` e referenciadas em `index.css` (`.font-orbitron`).
- **Widget ElevenLabs**:
  - O `<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" ...>` é carregado em `index.html`.
  - Posicionamento do widget é controlado via `style` inline no elemento `<elevenlabs-convai>`.
  - Para cenários de produção, considere externalizar o `agent-id` via variável de ambiente e injeção em tempo de build.
- **Métricas**: hoje são simuladas (random) em `App.tsx`. Conecte-as a fontes reais conforme necessário (WebSocket/REST/SDK).

## 🧩 Componentes principais
- `StatusPanel`: bloco com título, ícone e lista de métricas.
- `SystemMetric`: badge fixo no rodapé para indicadores rápidos.
- `HolographicElement`: anéis giratórios com efeitos visuais.
- `CircularProgress`: indicador circular com porcentagem.

## 🔐 Privacidade e segurança
- O `agent-id` fica exposto no `index.html`. Para projetos sensíveis, injete-o no build (por ex., variáveis `import.meta.env`) e não o versione em texto puro.

## 📦 Build e deploy
1. Build de produção
```bash
npm run build
```
Gera a pasta `dist/` (estático).
2. Deploy estático
- Vercel/Netlify/Cloudflare Pages: selecione framework Vite e o comando `npm run build`. A pasta de saída é `dist`.
- Qualquer hospedagem estática: sirva o conteúdo de `dist/`.

## ❓ Solução de problemas
- Widget não aparece: confirme o `agent-id`, verifique bloqueadores de script e o console do navegador.
- Estilos ausentes: confirme que `index.css` está importado em `main.tsx` e que o `content` do `tailwind.config.js` inclui `index.html` e `src/**/*.{js,ts,jsx,tsx}`.
- Build falha: verifique a versão do Node (18+) e reinstale dependências.

## 📄 Licença
Defina a licença do projeto (por exemplo, MIT). Se nada for definido, trate como uso interno.

---
Sinta-se à vontade para adaptar cores, fontes e layout dos componentes para combinar com a identidade da sua aplicação.
