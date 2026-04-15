# Sistema de Análise de Crédito

Aplicação web completa para análise de crédito de clientes, desenvolvida com Next.js.

## Funcionalidades

- Formulário para solicitação de crédito com os campos:
  - Idade do cliente
  - Renda mensal
  - Histórico de dívidas (limpo/negativado)
  - Valor do empréstimo solicitado
- Análise automática baseada em regras de negócio
- Registro de logs de cada análise realizada

## Regras de Análise

O crédito é aprovado apenas se todas as condições forem atendidas:

1. **Idade**: Cliente deve ter 18 anos ou mais
2. **Parcela**: A parcela (12x) não pode comprometer mais de 30% da renda mensal
3. **Histórico**: Histórico de dívidas deve estar limpo

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx          # Página principal com formulário
│   ├── layout.tsx        # Layout da aplicação
│   └── globals.css      # Estilos globais
├── validation/
│   └── creditValidation.ts  # Módulo de validação
├── service/
│   └── creditService.ts   # Lógica de negócio
├── utils/
│   └── logger.ts         # Utilitário de logging
└── repository/
    └── localStorageRepository.ts  # Persistência localStorage
```

## Como Executar

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:3000

### Produção

```bash
npm run build
npm start
```

## Technologias

- Next.js 14
- React 18
- TypeScript
- CSS Modules (sem frameworks)

## Autor

Sistema de Análise de Crédito