# Sistema de Análise de Crédito

Aplicação web completa para análise de crédito de clientes, desenvolvida em Next.js com arquitetura em camadas.

## Estrutura de Pastas

```
src/
├── app/
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal (UI)
├── components/
│   ├── CreditForm.tsx     # Formulário de análise (UI)
│   ├── ResultCard.tsx     # Card de resultado (UI)
│   └── LogTable.tsx       # Tabela de histórico (UI)
├── repositories/
│   └── CreditRepository.ts # Persistência (Repository)
├── services/
│   └── CreditService.ts   # Lógica de negócio (Service)
├── validation/
│   └── CreditValidation.ts # Validações (Validation)
└── types/
    └── index.ts           # Tipos TypeScript
```

## Camadas da Aplicação

### 1. UI (User Interface)
**Localização**: `src/components/` e `src/app/`

Responsável exclusivamente pela interface do usuário. Não contém lógica de negócio, apenas apresenta dados e captura entradas do usuário.

- `CreditForm.tsx`: Formulário com campos de entrada
- `ResultCard.tsx`: Exibe resultado aprovado/reprovado
- `LogTable.tsx`: Exibe histórico de análises

### 2. Validation
**Localização**: `src/validation/`

Contém funções puras de validação sem efeitos colaterais. Validam formato e faixa de valores dos dados de entrada.

- `isMaiorDeIdade()`: Verifica se idade >= 18
- `isRendaPositiva()`: Verifica se renda > 0
- `isValorEmprestimoPositivo()`: Verifica se valor > 0
- `isHistoricoValido()`: Verifica se histórico é válido
- `validateCreditRequest()`: Valida todo o request

### 3. Service
**Localização**: `src/services/`

Contém a lógica de negócio principal. Coordena validações, aplica regras de negócio e gerencia persistência através do Repository.

- `analisarCredito()`: Executa análise completa
- `salvarLog()`: Persiste resultado da análise
- `obterLogs()`: Recupera histórico de análises

### 4. Repository
**Localização**: `src/repositories/`

Responsável pela persistência de dados. Abstrai o LocalStorage, permitindo que a lógica de negócio não accesse diretamente o armazenamento.

- `saveLog()`: Salva novo log
- `getAll()`: Recupera todos os logs
- `clearAll()`: Limpa todos os logs

## Regras de Implementação

1. **IFs aninhados**: Máximo 2 níveis
2. **Linhas por função**: Máximo 10 linhas
3. **Separação de camadas**: Obrigatória
4. **Nomeação descritiva**: Funções e variáveis com nomes claros

## Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# OU com yarn
yarn install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

### Build de Produção

```bash
npm run build
npm run start
```

## Funcionalidades

1. **Formulário de Análise**: Campos para idade, renda mensal, histórico de dívidas e valor do empréstimo
2. **Validação**: Verifica se cliente tem 18+ anos, renda positiva, valor válido
3. **Análise de Crédito**:
   - Calcula parcela em 12x
   - Verifica comprometimento de renda (<= 30%)
   - Verifica histórico de dívidas
4. **Resultado**: Exibe "Aprovado" ou "Reprovado" com motivo
5. **Histórico**: Registra todas as análises em LocalStorage