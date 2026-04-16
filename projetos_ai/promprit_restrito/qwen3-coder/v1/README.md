# Sistema de Análise de Crédito

Aplicação web Next.js para análise de crédito de clientes.

## Estrutura do Projeto

```
src/
├── app/                    # UI - Páginas Next.js
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raiz
│   └── globals.css        # Estilos globais
├── layers/                # Camadas da aplicação
│   ├── validation/       # VALIDAÇÃO - Regras de validação de entrada
│   │   └── index.ts
│   ├── service/          # SERVIÇO - Lógica de negócio
│   │   └── index.ts
│   └── repository/       # REPOSITORY - Persistência (LocalStorage)
│       └── index.ts
├── components/           # UI - Componentes React
│   ├── CreditForm.tsx
│   ├── ResultDisplay.tsx
│   └── LogViewer.tsx
└── types.ts              # Tipos TypeScript compartilhados
```

## Camadas da Aplicação

### 1. Validation (Validação)
- Recebe dados crus do formulário
- Valida formato e regras básicas (idade mínima, valores positivos)
- Retorna `{ valido: boolean, erros: string[] }`
- **Não contém lógica de negócio**

### 2. Service (Serviço/Lógica de Negócio)
- Contém todas as regras de negócio
- Calcula parcelas, verifica limites de renda
- Chama Validation para validar dados
- Chama Repository para persistir logs
- **Não acessa LocalStorage diretamente**

### 3. Repository (Persistência)
- Responsável por toda comunicação com LocalStorage
- Funções: criarLog, adicionarLog, obterTodosLogs
- A lógica de negócio usa esta camada para persistência

### 4. UI (Interface)
- Componentes React puros
- Recebe callbacks e dados via props
- **Não contém lógica de negócio**
- Apenas renderiza e captura eventos

## Regras de Negócio

| Regra | Condição |
|-------|----------|
| Idade mínima | 18 anos ou mais |
| Parcelas | 12x fixas |
| Juros | 5% ao mês sobre o total |
| Comprometimento | Máximo 30% da renda |
| Histórico | Apenas "limpo" é aprovado |

## Instruções para Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

Acesse: http://localhost:3000

## Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- LocalStorage para persistência
