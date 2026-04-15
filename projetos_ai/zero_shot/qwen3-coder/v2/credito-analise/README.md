# Análise de Crédito

Aplicação web para análise de crédito de clientes, construída com **Next.js**, **TypeScript** e **Tailwind CSS**.

## Funcionalidades

- Formulário com campos de idade, renda mensal, histórico de dívidas e valor do empréstimo
- Análise automática baseada em 3 regras:
  1. **Maioridade** — cliente deve ter 18 anos ou mais
  2. **Comprometimento de renda** — parcela não pode exceder 30% da renda mensal (12 parcelas fixas)
  3. **Histórico de dívidas** — cliente não pode estar negativado
- Resultado instantâneo: **Aprovado** ou **Reprovado**
- Registro persistente de logs em arquivo JSON com data/hora, dados do cliente e resultado
- Tabela de histórico com todas as análises realizadas

## Estrutura do Projeto

```
credito-analise/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analise/      # POST — processa a análise de crédito
│   │   │   │   └── route.ts
│   │   │   └── logs/         # GET/DELETE — gerencia logs armazenados
│   │   │       └── route.ts
│   │   ├── page.tsx          # Página principal (formulário + tabela)
│   │   ├── layout.tsx        # Layout raiz
│   │   └── globals.css       # Estilos globais
│   ├── components/
│   │   ├── CreditForm.tsx    # Formulário de entrada
│   │   └── ResultDisplay.tsx # Exibição do resultado
│   ├── lib/
│   │   ├── analiseCredito.ts # Lógica de negócio (regras de crédito)
│   │   └── logStorage.ts     # Persistência de logs em JSON
│   └── types/
│       └── credito.ts        # Interfaces TypeScript
└── data/
    └── logs.json             # Arquivo de logs (gerado automaticamente)
```

## Pré-requisitos

- **Node.js** >= 18
- **npm** (ou yarn/pnpm)

## Como Executar

1. **Acesse o diretório do projeto:**
   ```bash
   cd credito-analise
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra o navegador:**
   Acesse [http://localhost:3000](http://localhost:3000)

## Build de Produção

```bash
npm run build
npm start
```

## Regras de Negócio

| Regra                       | Critério                          |
|-----------------------------|------------------------------------|
| Idade mínima                | 18 anos                           |
| Máx. comprometimento renda  | 30% da renda mensal               |
| Histórico de dívidas        | Deve estar "limpo"                |
| Número de parcelas          | 12 (fixo)                         |

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React (App Router)
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) — Estilização utility-first
- File System (fs) — Persistência de logs em JSON
