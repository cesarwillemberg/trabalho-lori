# Sistema de Análise de Crédito

Aplicação web completa em Next.js para avaliação de aprovação de crédito com base em regras de negócio definidas.

## Estrutura de Pastas

```
credit-analysis-app/
├── src/
│   ├── app/                    # Aplicação Next.js (páginas e rotas)
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página inicial
│   │   └── types.ts          # Definições de tipos TypeScript
│   ├── components/             # Componentes React (UI)
│   │   ├── CreditForm.tsx     # Formulário de análise
│   │   └── LogHistory.tsx    # Histórico de análises
│   ├── domain/                # Lógica de negócio
│   │   └── creditAnalysis.ts # Motor de análise de crédito
│   └── storage/               # Persistência de dados
│       └── logStorage.ts      # Armazenamento LocalStorage
├── package.json
├── tsconfig.json
├── next.config.js
└── next-env.d.ts
```

## Regras de Negócio

1. **Idade mínima**: Cliente deve ter 18 anos ou mais
2. **Parcelas**: 12 parcelas fixas (sem juros)
3. **Comprometimento de renda**: Parcela máxima de 30% da renda mensal
4. **Histórico de dívidas**: Deve estar "limpo" (não negativado)
5. **Aprovação**: Crédito aprovado apenas se TODAS as condições forem atendidas

## Instruções de Execução

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

### Passo 1: Instalar dependências

```bash
npm install
```

### Passo 2: Iniciar servidor de desenvolvimento

```bash
npm run dev
```

### Passo 3: Acessar a aplicação

Abra o navegador e vá para: `http://localhost:3000`

## Uso do Sistema

1. Preencha os campos do formulário:
   - Idade (número)
   - Renda mensal (R$)
   - Histórico de dívidas (selecione "Limpo" ou "Negativado")
   - Valor do empréstimo (R$)

2. Clique em "Analisar Crédito"

3. O resultado será exibido:
   - **Aprovado**: Verde - Crédito aprovado
   - **Reprovado**: Vermelho - Crédito não aprovado (com motivos)

4. O histórico de análises é salvo automaticamente no LocalStorage

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa verificação de código |

## Separação de Responsabilidades

- **UI (`/components`)**: Componentes React para interface do usuário
- **Domain (`/domain`)**: Lógica de negócio pura, sem dependências de UI ou storage
- **Storage (`/storage`)**: Persistência de dados isolada (LocalStorage)
- **Types (`/app/types`)**: Tipos e interfaces TypeScript compartilhados