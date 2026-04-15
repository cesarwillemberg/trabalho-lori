# Aplicação de Análise de Crédito

Aplicação web completa com Next.js para análise de crédito de clientes.

## Funcionalidades

- Formulário para entrada de dados do cliente (idade, renda mensal, histórico de dívidas, valor do empréstimo)
- Validação de dados de entrada
- Lógica de aprovação de crédito:
  - Cliente deve ser maior de idade (18+ anos)
  - Parcela (12x) não pode comprometer mais de 30% da renda mensal
  - Histórico de dívidas deve estar "limpo"
- Registro de logs de todas as análises realizadas (armazenados no localStorage)
- Interface responsiva para visualização dos resultados e histórico

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx      # Layout principal
│   └── page.tsx       # Página principal
├── components/
│   └── CreditForm.tsx # Componente do formulário
├── validation/
│   └── creditValidation.ts  # Validações de entrada
├── service/
│   └── creditService.ts      # Lógica de negócio
├── repository/
│   └── localStorageRepository.ts  # Persistência
└── utils/
    ├── calculation.ts  # Funções de cálculo
    └── logger.ts      # Funções de log
```

## Requisitos

- Node.js 18+ 
- npm ou yarn

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## Build para Produção

```bash
npm run build
npm run start
```

## Regras de Negócio

1. **Idade**: Cliente deve ter 18 anos ou mais
2. **Parcela**: Valor da parcela (12x) não pode exceder 30% da renda mensal
3. **Histórico**: Histórico de dívidas deve ser "limpo" (não "negativado")

## API do Serviço

```typescript
import { analyzeCredit, getAnalysisLogs, clearAnalysisLogs } from './src/service/creditService';

const result = analyzeCredit({
  age: 25,
  monthlyIncome: 5000,
  loanAmount: 12000,
  debtHistory: 'limpo'
});

console.log(result);
// {
//   approved: true,
//   message: 'Aprovado: Crédito aprovado para cliente',
//   details: {
//     isAdult: true,
//     incomeRatio: 0.2,
//     isWithinLimit: true,
//     hasCleanDebtHistory: true,
//     installmentValue: 1000
//   },
//   timestamp: '2024-01-15T10:30:00.000Z',
//   clientData: { ... }
// }
```