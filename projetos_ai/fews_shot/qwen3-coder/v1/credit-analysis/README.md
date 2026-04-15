# Análise de Crédito - Credit Analysis Application

Uma aplicação web completa para análise de crédito de clientes, construída com Next.js (latest), TypeScript e Tailwind CSS.

## 📋 Funcionalidades

- ✅ Validação de idade (cliente deve ter 18 anos ou mais)
- ✅ Cálculo de parcelas (12 parcelas fixas)
- ✅ Verificação de comprometimento de renda (máximo 30%)
- ✅ Verificação de histórico de dívidas (limpo ou negativado)
- ✅ Registro de logs de todas as análises realizadas
- ✅ Interface web responsiva e intuitiva
- ✅ Persistência de dados em LocalStorage

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão de separação de responsabilidades:

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── credit/
│   │       └── route.ts   # API Route para análise de crédito
│   ├── page.tsx           # Página principal com formulário
│   ├── layout.tsx         # Layout raiz da aplicação
│   └── globals.css        # Estilos globais
├── types/
│   └── credit.ts          # Definições de TypeScript
├── validation/            # Módulos de validação
│   ├── ageValidation.ts   # Validação de idade
│   ├── incomeValidation.ts # Validação de renda
│   ├── debtHistoryValidation.ts # Validação de histórico
│   ├── loanValidation.ts  # Validação de empréstimo
│   └── index.ts           # Exportação centralizada
├── service/               # Lógica de negócio
│   ├── creditService.ts   # Serviço de análise de crédito
│   └── index.ts           # Exportação centralizada
├── utils/                 # Utilitários
│   ├── calculation.ts     # Cálculos de parcelas
│   ├── logger.ts          # Registro de logs
│   └── index.ts           # Exportação centralizada
└── repository/            # Persistência de dados
    ├── creditAnalysisRepository.ts # Repositório
    └── index.ts           # Exportação centralizada
```

## 🚀 Regras de Negócio

1. **Validação de Idade**: O cliente deve ter 18 anos ou mais
2. **Cálculo de Parcelas**: O valor do empréstimo é dividido em 12 parcelas fixas
3. **Limite de Renda**: A parcela não pode comprometer mais de 30% da renda mensal
4. **Histórico de Dívidas**: Cliente deve ter histórico "limpo" (sem restrições)

**Critério de Aprovação**: Todas as condições acima devem ser atendidas para que o crédito seja aprovado.

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Passo 1: Instalar dependências

```bash
cd credit-analysis
npm install
```

### Passo 2: Executar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

### Passo 3: Build para produção

```bash
npm run build
npm run start
```

## 🎮 Como Usar

1. Acesse a aplicação no navegador (http://localhost:3000)
2. Preencha o formulário com:
   - **Idade**: Idade do cliente em anos
   - **Renda Mensal**: Renda mensal bruta em Reais
   - **Histórico de Dívidas**: Selecione "Limpo" ou "Negativado"
   - **Valor do Empréstimo**: Valor solicitado para empréstimo
3. Clique em "Solicitar Análise de Crédito"
4. Visualize o resultado da análise com detalhes completos

## 📊 Exemplo de Análise

**Entrada:**
- Idade: 30 anos
- Renda Mensal: R$ 5.000,00
- Histórico: Limpo
- Valor do Empréstimo: R$ 12.000,00

**Processamento:**
- Valor da parcela (12x): R$ 1.000,00
- Comprometimento da renda: 20% (1000/5000 * 100)
- Dentro do limite de 30%: ✅ Sim

**Resultado:** ✅ **APROVADO**

## 🔍 Logs de Análise

Todas as análises são registradas no LocalStorage do navegador com:
- Timestamp (data e hora)
- Dados do cliente
- Resultado da avaliação
- Detalhes da análise

Para visualizar os logs:
1. Abra o DevTools do navegador (F12)
2. Acesse: Application > Local Storage
3. Procure pela chave: `credit_analysis_logs`

## 🛠️ Tecnologias Utilizadas

- **Next.js 16**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utility-first
- **React 19**: Biblioteca de UI

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
```

## 🧪 Estrutura de Código

O código segue boas práticas de desenvolvimento:

- **Separação de Responsabilidades**: Validação, serviço, utilitários e repositório em módulos separados
- **Tipagem Forte**: Uso extensivo de TypeScript para segurança de tipos
- **Comentários Explicativos**: Documentação inline de funções importantes
- **Tratamento de Erros**: Validações e try/catch para operações críticas

## 👨‍💻 Desenvolvedor

Projeto criado como exemplo de aplicação Next.js com análise de crédito.

## 📄 Licença

MIT
