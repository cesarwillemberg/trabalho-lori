# Sistema de Análise de Crédito

Aplicação web completa com Next.js para análise de crédito de clientes, incluindo interface, lógica de negócio e registro de logs.

## Estrutura do Projeto

```
credit-analysis/
├── src/
│   ├── validation/         # Validações de dados
│   │   └── creditValidation.ts
│   ├── services/           # Regras de negócio
│   │   └── creditService.ts
│   ├── repository/         # Persistência de dados
│   │   └── logRepository.ts
│   ├── types/              # Tipos TypeScript
│   │   └── credit.ts
│   ├── components/         # Componentes React
│   │   ├── CreditForm.tsx
│   │   ├── ResultCard.tsx
│   │   └── LogList.tsx
│   └── app/                # Páginas Next.js
│       ├── page.tsx
│       ├── layout.tsx
│       └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

## Regras de Negócio

1. **Validação de Idade**: Cliente deve ter 18+ anos
2. **Comprometimento de Renda**: Parcela (12x) não pode exceder 30% da renda mensal
3. **Histórico de Dívidas**: Apenas clientes com histórico "limpo" são aprovados
4. **Aprovação**: Todas as condições devem ser atendidas simultaneamente

## Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
cd credit-analysis
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### Build para Produção

```bash
npm run build
npm start
```

## Funcionalidades

- Formulário com campos: idade, renda mensal, histórico de dívidas, valor do empréstimo
- Validação em tempo real dos campos
- Cálculo automático de comprometimento de renda
- Resultado: "Aprovado" ou "Reprovado" com motivos
- Histórico de análises com registros em LocalStorage
- Limpar histórico de logs

## Tecnologias

- Next.js 15 (App Router)
- TypeScript
- CSS Modules / Global CSS
- LocalStorage para persistência de logs