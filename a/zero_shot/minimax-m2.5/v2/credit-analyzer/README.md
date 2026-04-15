# Credit Analyzer

Sistema web para análise de crédito de clientes desenvolvido com Next.js (App Router).

## Funcionalidades

- **Formulário de análise**: Coleta dados do cliente (idade, renda mensal, histórico de dívidas, valor do empréstimo)
- **Análise automatizada**: Aplica regras de negócio para approval ou reprovação do crédito
- **Resultado detalhado**: Exibe condições avaliadas e detalhes da análise
- **Registro de logs**: Armazena histórico de todas as análises realizadas

## Regras de Negócio

O crédito é aprovado apenas se **todas** as condições forem atendidas:

1. **Idade**: Cliente deve ter 18 anos ou mais
2. **Parcela**: Valor da parcela (12x) não pode exceder 30% da renda mensal
3. **Histórico**: Histórico de dívidas deve estar "limpo"

## Instalação

```bash
cd credit-analyzer
npm install
```

## Execução

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página principal
├── components/
│   ├── CreditForm.tsx   # Formulário de análise
│   ├── ResultCard.tsx  # Card de resultado
│   └── LogList.tsx     # Lista de logs
├── lib/
│   ├── creditAnalysis.ts # Lógica de negócio
│   └── storage.ts       # Persistência LocalStorage
└── types/
    └── index.ts         # TypeScript interfaces
```

## Tecnologias

- Next.js 16 (App Router)
- TypeScript
- CSS Modules / CSS Global
- LocalStorage para persistência
