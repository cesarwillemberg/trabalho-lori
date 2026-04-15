# Especificação: Sistema de Análise de Crédito

## 1. Visão Geral do Projeto

- **Nome**: Credit Analyzer
- **Tipo**: Aplicação Web (Next.js)
- **Resumo**: Sistema para análise de crédito de clientes com validação de idade, renda, histórico de dívidas e cálculo de parcelas
- **Usuários**: Operadores de crédito, financeira

## 2. Especificação de UI/UX

### Layout

- **Header**: Título "Credit Analyzer" com ícone
- **Main**: Formulário centralizado + área de resultado
- **Footer**: Logs das análises realizadas

### Design

- **Cores**:
  - Primary: `#1a1a2e` (azul escuro)
  - Secondary: `#16213e` (azul mais escuro)
  - Accent: `#e94560` (vermelho vibrante)
  - Success: `#00d9a5` (verde)
  - Background: `#0f0f23` (preto azulado)
  - Text: `#eaeaea` (cinza claro)
  - Card: `#1f1f3a` (cinza azulado)

- **Tipografia**:
  - Font Family: 'Inter', sans-serif
  - Headings: 700, 2rem
  - Body: 400, 1rem

- **Efeitos**:
  - Sombras suaves nos cards
  - Transições suaves nos botões
  - Animação de entrada do resultado

### Componentes

1. **Formulário de Crédito**
   - Campo Idade (number, 18-120)
   - Campo Renda Mensal (currency)
   - Campo Histórico Dívidas (select: limpo/negativado)
   - Campo Valor Empréstimo (currency)
   - Botão "Analisar Crédito"

2. **Card de Resultado**
   - Status visual (aprovado/reprovado)
   - Detalhes da análise
   - Informações das condições avaliadas

3. **Lista de Logs**
   - Data/Hora
   - Dados do cliente (mascarados)
   - Resultado

## 3. Especificação Funcional

### Regras de Negócio

```
CONDIÇÃO 1: Idade >= 18 anos
CONDIÇÃO 2: Parcela <= 30% da renda mensal
  - Parcela = Valor Empréstimo / 12
  - Percentual = (Parcela / Renda Mensal) * 100
CONDIÇÃO 3: Histórico de dívidas == "limpo"

APROVAÇÃO: CONDIÇÃO 1 && CONDIÇÃO 2 && CONDIÇÃO 3
```

### Fluxo de Dados

1. Usuário preenche formulário
2. Sistema valida inputs
3. Sistema aplica regras de negócio
4. Sistema exibe resultado
5. Sistema registra log

### Estrutura de Log

```json
{
  "id": "uuid",
  "timestamp": "ISO 8601",
  "clientData": {
    "age": number,
    "monthlyIncome": number,
    "debtHistory": "limpo" | "negativado",
    "loanAmount": number
  },
  "analysisResult": {
    "approved": boolean,
    "conditions": {
      "ageValid": boolean,
      "installmentValid": boolean,
      "debtHistoryValid": boolean
    },
    "installmentPercentage": number,
    "installmentValue": number
  }
}
```

## 4. Arquitetura

```
/src
  /app
    page.tsx          - Página principal
    layout.tsx        - Layout global
    globals.css       - Estilos globais
  /components
    CreditForm.tsx    - Formulário de análise
    ResultCard.tsx    - Card de resultado
    LogList.tsx       - Lista de logs
  /lib
    creditAnalysis.ts - Lógica de negócio
    storage.ts        - Persistência (LocalStorage)
  /types
    index.ts          - TypeScript interfaces
```

## 5. Critérios de Aceitação

- [ ] Formulário com todos os campos obrigatórios
- [ ] Validação de idade mínima (18 anos)
- [ ] Cálculo correto de parcela (12x)
- [ ] Verificação de 30% de comprometimento
- [ ] Validação de histórico de dívidas
- [ ] Exibição clara de resultado aprovado/reprovado
- [ ] Registro de logs com timestamp
- [ ] Persistência de logs (LocalStorage)
- [ ] Interface responsiva
- [ ] Código modular e organizado
