# Análise de Crédito - Next.js

Aplicação web para análise de crédito de clientes com regras de negócio, validações e persistência de logs.

## Estrutura de Pastas

```
credit-analysis/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── CreditForm.tsx        # Componente de interface (UI)
│   ├── layers/
│   │   ├── validation/
│   │   │   ├── creditValidation.ts
│   │   │   └── index.ts
│   │   ├── service/
│   │   │   ├── creditService.ts
│   │   │   └── index.ts
│   │   └── repository/
│   │       ├── logRepository.ts
│   │       └── index.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Camadas da Aplicação

### 1. UI (src/components/CreditForm.tsx)
Responsável exclusivamente pela interface com o usuário. Não contém lógica de negócio.
- Renderiza o formulário com campos de entrada
- Exibe resultados e erros
- Chama funções das camadas de validação e serviço

### 2. Validation (src/layers/validation/)
Camada responsável por validar os dados de entrada.
- `validateAge()` - Verifica se idade >= 18
- `validateIncome()` - Verifica se renda > 0
- `validateLoanAmount()` - Verifica se valor do empréstimo > 0
- `validateDebtHistory()` - Verifica se histórico é válido
- `validateCreditRequest()` - Validação completa

### 3. Service (src/layers/service/)
Camada de lógica de negócio.
- `calculateInstallmentValue()` - Calcula parcela (12x fixas)
- `calculateInstallmentPercentage()` - Calcula % da renda
- `isIncomeCompromised()` - Verifica se > 30% da renda
- `hasDebtRestrictions()` - Verifica histórico negativado
- `analyzeCredit()` - Executa análise completa

### 4. Repository (src/layers/repository/)
Camada de persistência. Acessa o LocalStorage.
- `saveLog()` - Salva log de análise
- `getAllLogs()` - Recupera todos os logs
- `clearLogs()` - Limpa logs

## Regras de Negócio

- Idade mínima: 18 anos
- Parcelas: 12 fixas
- Comprometimento máximo da renda: 30%
- Histórico negativado: automático reprovação
- Aprovação: apenas se todas condições atendidas

## Como Rodar

```bash
# Navegue até o diretório do projeto
cd credit-analysis

# Instale as dependências (se necessário)
npm install --ignore-scripts

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## Build para Produção

```bash
npm run build
npm start
```
