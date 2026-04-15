# Análise de Crédito - Sistema de Aprovação

## 1. Estrutura de Pastas

```
credit-analysis-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout raiz da aplicação
│   │   └── page.tsx        # Página principal
│   ├── business/
│   │   └── creditAnalysis.ts   # Lógica de negócio (regras de análise)
│   ├── components/
│   │   └── CreditForm.tsx      # Interface (UI) - Formulário de crédito
│   ├── persistence/
│   │   └── localStorageRepository.ts  # Persistência (LocalStorage)
│   ├── types/
│   │   └── index.ts           # Definição de tipos TypeScript
│   └── styles/
│       └── globals.css        # Estilos globais
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 2. Arquivos Principais

### Types (`src/types/index.ts`)
Define as interfaces usadas em toda a aplicação:
- `CreditRequest`: Dados de entrada do cliente
- `CreditAnalysisResult`: Resultado da análise de crédito
- `LogEntry`: Estrutura para logs de análise

### Business (`src/business/creditAnalysis.ts`)
Contém a lógica de negócio:
- `calcularParcela()`: Calcula valor da parcela (12x fixas)
- `calcularPercentualComprometido()`: Calcula % da renda comprometida
- `validarIdade()`: Verifica se >= 18 anos
- `verificarComprometimentoRenda()`: Verifica se <= 30%
- `verificarHistorico()`: Verifica se histórico é "limpo"
- `analisarCredito()`: Função principal que executa todas as validações

### Persistence (`src/persistence/localStorageRepository.ts`)
Responsável pela persistência de dados:
- `salvarLog()`: Salva análise no LocalStorage
- `obterLogs()`: Recupera todos os logs
- `limparLogs()`: Remove todos os logs

### Components (`src/components/CreditForm.tsx`)
Interface do usuário com:
- Formulário para entrada de dados
- Exibição de resultado (Aprovado/Reprovado)
- Histórico de análises anteriores
- Tratamento de erros e validações

## 3. Instruções de Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passo a Passo

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   Abra o navegador e vá para: `http://localhost:3000`

### Comandos Úteis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria versão de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Verifica código

## 4. Regras de Negócio Implementadas

| Regra | Condição |
|-------|----------|
| Idade mínima | Cliente deve ter 18 anos ou mais |
| Parcelas | 12 parcelas fixas |
| Comprometimento renda | Parcela não pode exceder 30% da renda |
| Histórico | Histórico deve estar "limpo" |
| Aprovação | Todas as condições devem ser atendidas |

## 5. Persistência

O sistema utiliza **LocalStorage** do navegador para armazenar os logs de análise. Cada análise registrada contém:
- Data e hora
- Dados do cliente (idade, renda, histórico, valor)
- Resultado da avaliação
