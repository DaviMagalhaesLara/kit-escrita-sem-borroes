# Kit Escrita Sem Borrões

Landing page de alta conversão para vender um PDF imprimível de atividades de escrita para crianças canhotas.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/kit-escrita-sem-borroes/src/App.tsx` — página completa, copy, mockups e comportamento interativo.
- `artifacts/kit-escrita-sem-borroes/src/index.css` — tokens visuais, tipografia, textura de papel, responsividade e animações.
- `artifacts/kit-escrita-sem-borroes/.replit-artifact/artifact.toml` — configuração do artefato e workflow de preview.

## Architecture decisions

- A landing page é frontend-only: o checkout é um link configurável e não há dependência de backend para apresentar o produto.
- O mockup do caderno e as prévias de atividades são ilustrações CSS/SVG próprias para evitar dependência de imagens externas.
- Todos os CTAs de compra reutilizam a constante `CHECKOUT_URL`, mantendo a troca de checkout em um único lugar.
- A copy evita promessas médicas, falsa urgência, depoimentos inventados e posiciona o material como apoio prático para uso em casa.

## Product

- Apresenta um kit digital de 50 páginas em PDF A4 para crianças aproximadamente de 4 a 7 anos.
- Explica a progressão das atividades, mostra amostras visuais, esclarece para quem o material é indicado e oferece CTAs recorrentes.
- Inclui navegação suave, menu responsivo, FAQ accordion, animações leves e barra fixa de compra no mobile.

## User preferences

- Comunicação em português brasileiro, acolhedora e específica para pais e responsáveis.
- Estética infantil/cartoon organizada, profissional e diretamente associada a caderno, papel e lápis.

## Gotchas

- `CHECKOUT_URL` em `src/App.tsx` ainda usa um endereço de exemplo e deve ser substituído antes da publicação.
- O build manual do Vite exige `PORT` e `BASE_PATH`; o workflow do artefato fornece essas variáveis automaticamente.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
