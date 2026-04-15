# Aplicação de Análise de Crédito

Uma aplicação web completa construída com **Next.js** para análise de crédito de clientes. O sistema avalia se um cliente está apto a receber um empréstimo com base em critérios como idade, renda mensal, histórico de dívidas e valor solicitado.

## Funcionalidades

- **Formulário de análise** com campos de idade, renda mensal, histórico de dívidas e valor do empréstimo
- **Regras de aprovação**:
  - Cliente deve ter 18 anos ou mais
  - A parcela (em 12x fixas) não pode comprometer mais de 30% da renda mensal
  - Histórico de dívidas deve estar "limpo"
- **Resultado visual** mostrando "Aprovado" ou "Reprovado" com detalhes
- **Histórico de logs** de todas as análises realizadas, armazenado no LocalStorage

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (latest) com App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- LocalStorage para persistência de logs

## Estrutura do Projeto

```
credit-analysis/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Página principal que integra todos os componentes
│   │   ├── layout.tsx         # Layout raiz da aplicação
│   │   └── globals.css        # Estilos globais personalizados
│   ├── components/
│   │   ├── CreditForm.tsx     # Formulário de coleta de dados do cliente
│   │   ├── AnalysisResult.tsx # Exibição do resultado da análise
│   │   └── AnalysisLogs.tsx   # Histórico de análises realizadas
│   ├── lib/
│   │   ├── creditAnalysis.ts  # Lógica de negócio para análise de crédito
│   │   └── logStorage.ts      # Sistema de logs com LocalStorage
│   └── types/
│       └── index.ts           # Definições de tipos TypeScript
├── package.json
└── README.md
```

## Como Executar

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** (ou yarn/pnpm)

### Passo a passo

1. **Clone ou acesse o diretório do projeto:**

   ```bash
   cd credit-analysis
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Abra o navegador e acesse:**

   ```
   http://localhost:3000
   ```

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção (após o build) |
| `npm run lint` | Executa o linter do projeto |

## Regras de Negócio

### Aprovação de Crédito

O crédito é **aprovado** apenas quando **todas** as condições abaixo são atendidas:

1. **Maioridade**: Cliente deve ter 18 anos ou mais
2. **Comprometimento de renda**: O valor da parcela (empréstimo ÷ 12) não pode exceder 30% da renda mensal
3. **Histórico de dívidas**: Cliente deve estar com o histórico "limpo" (não negativado)

### Exemplo

Para um cliente de 30 anos, com renda de R$ 5.000,00, histórico limpo, solicitando R$ 12.000,00:

- Parcela: R$ 12.000 ÷ 12 = R$ 1.000,00
- Comprometimento: R$ 1.000 ÷ R$ 5.000 = 20% (< 30%) ✓
- **Resultado**: Aprovado ✓

## Autor

Desenvolvido como projeto acadêmico para demonstração de análise de crédito com Next.js.
