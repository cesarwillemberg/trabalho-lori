# Especificação: Sistema de Análise de Crédito

## Visão Geral
- **Tipo**: Aplicação web Next.js para análise de crédito de clientes
- **Funcionalidade**: Avaliar solicitações de empréstimo berdasarkan critérios financeiros
- **Usuários**: Operadores de crédito

## Regras de Negócio
1. Cliente deve ter 18+ anos
2. Parcela = valor_empréstimo / 12
3. Parcela não pode exceder 30% da renda mensal
4. Histórico precisa estar "limpo"
5. Aprovação فقط se TODAS condições atendidas

## Arquitetura em Camadas
```
src/
├── ui/              # Componentes React (sem lógica de negócio)
├── service/         # Regras de negócio
├── validation/     # Validações
└── repository/     # Persistência (LocalStorage)
```

## Stack
- Next.js 14 (App Router)
- TypeScript
- CSS Modules

## Persistência
- LocalStorage com logs de análise
- Formato JSON com data/hora, dados do cliente, resultado