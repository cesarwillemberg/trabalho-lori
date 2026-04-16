# Sistema de Analise de Credito

Aplicacao web completa desenvolvida com Next.js para analise de credito de clientes, seguindo arquitetura modular com separacao de responsabilidades.

## Estrutura do Projeto

```
credit-analysis-app/
├── app/                          # Paginas Next.js (App Router)
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Pagina inicial
│   └── page.module.css          # Estilos da pagina
├── components/                   # Componentes React
│   ├── CreditForm.tsx           # Formulario de analise
│   ├── ResultDisplay.tsx        # Exibicao do resultado
│   └── HistoryPanel.tsx         # Painel de historico
├── types/                        # Definicoes de tipos TypeScript
│   └── credit.ts                 # Tipos para analise de credito
├── validation/                   # Camada de validacao
│   └── creditValidation.ts       # Regras de validacao
├── utils/                         # Funcoes utilitarias
│   ├── calculations.ts           # Calculos financeiros
│   └── helpers.ts                # Funcoes auxiliares
├── repository/                    # Camada de persistencia
│   └── localStorageRepository.ts # Operacoes LocalStorage
├── services/                      # Camada de servico/negocio
│   └── creditService.ts          # Logica de negocio
├── package.json                   # Dependencias do projeto
├── tsconfig.json                  # Configuracao TypeScript
└── next.config.js                 # Configuracao Next.js
```

## Regras de Negocio

O sistema aprova creditos apenas quando todas as condicoes sao atendidas:

1. **Idade Minima**: Cliente deve ter 18 anos ou mais
2. **Parcela da Renda**: Valor da parcela mensal nao pode exceder 30% da renda mensal
3. **Historico de Dividas**: Cliente deve ter historico "limpo" (sem restricoes)
4. **Emprestimo**: Valor do emprestimo eh divido em 12 parcelas fixas

## Como Executar

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

### 3. Acessar a Aplicacao

Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)

## Arquitetura

### Camada de Validacao (`validation/`)

Responsavel por validar os dados de entrada do formulario:
- Verifica se o cliente tem idade minima de 18 anos
- Valida se o historico de dividas esta correto
- Confirma se a parcela nao excede 30% da renda

### Camada de Servico (`services/`)

Contem a logica de negocio principal:
- Orquestra a validacao dos dados
- Calcula o resultado da analise
- Salva logs de cada analise realizada

### Camada de Persistencia (`repository/`)

Gerencia o armazenamento de dados:
- Salva logs no LocalStorage do navegador
- Permite recuperar e manipular historico de analises

### Camada de Utils (`utils/`)

Funcoes auxiliares e calculos:
- Calculo de parcelas mensais
- Formatacao de moeda e percentuais
- Geracao de IDs unicos e timestamps

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca de interfaces
- **TypeScript** - Linguagem com tipagem estatica
- **CSS Modules** - Estilizacao componentizada

## Funcionalidades

- Formulario com campos: idade, renda mensal, historico de dividas e valor do emprestimo
- Analise automatica baseada nas regras de negocio
- Exibicao detalhada do resultado (aprovado/reprovado)
- Painel de historico com todas as analises realizadas
- Persistencia de dados no LocalStorage
