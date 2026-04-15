# Sistema de Análise de Crédito

Aplicação web completa em Next.js para avaliação de crédito de clientes.

## Estrutura de Pastas

```
credit-analysis-app/
├── src/
│   ├── app/
│   │   ├── api/credit/route.ts    # API route para análise
│   │   ├── globals.css            # Estilos globais
│   │   ├── layout.tsx            # Layout principal
│   │   └── page.tsx              # Página inicial
│   ├── business_logic/
│   │   └── creditAnalysis.ts     # Regras de negócio
│   ├── components/
│   │   ├── CreditForm.tsx        # Formulário de crédito
│   │   └── CreditForm.module.css # Estilos do formulário
│   └── persistence/
│       └── localStoragePersistence.ts # Persistência LocalStorage
├── package.json
├── tsconfig.json
└── next-env.d.ts
```

## Regras de Negócio Implementadas

1. Idade mínima: 18 anos
2. Parcelas: 12 fixas
3. Limite de comprometimento: 30% da renda
4. Histórico: apenas "limpo" é aprovado
5. Aprovação: todas as condições devem ser atendidas

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## Instalação

```bash
cd credit-analysis-app
npm install
```

## Execução

```bash
npm run dev
```

Acesse: http://localhost:3000

## Logs

Os logs de análise são salvos no LocalStorage do navegador.