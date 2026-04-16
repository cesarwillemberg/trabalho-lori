# Sistema de Analise de Credito

Aplicacao web em Next.js para avaliar aprovacao de credito com base em regras de negocio, exibindo o resultado da analise e registrando logs no `localStorage`.

## Requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Como executar

1. Instale as dependencias:

```bash
npm install
```

2. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra `http://localhost:3000` no navegador.

## Regras da analise

- Cliente deve ter 18 anos ou mais
- O emprestimo e dividido em 12 parcelas fixas
- A parcela nao pode comprometer mais de 30% da renda mensal
- Cliente com historico negativado e reprovado
- O credito so e aprovado quando todas as condicoes sao atendidas
