# Sistema de Análise de Crédito - Especificação

## 1. Visão Geral do Projeto

**Nome:** Credit Analyzer
**Tipo:** Aplicação Web Fullstack (Next.js)
**Funcionalidade Principal:** Sistema de análise de crédito para aprovação ou reprovação de pedidos de empréstimo baseado em regras de negócio predefinidas.
**Usuários Alvo:** Instituições financeiras, pequenas empresas de crédito, departamentos de RH.

---

## 2. Especificação UI/UX

### 2.1 Estrutura de Layout

- **Header:** Logo/Título centralizado, design minimalista
- **Main Content:**
  - Container centralizado (max-width: 600px)
  - Seção do formulário (card)
  - Seção do resultado
  - Seção de histórico/logs
- **Footer:** Créditos e versão

### 2.2 Design Visual

#### Paleta de Cores
- **Primária:** `#1E3A5F` (Azul escuro profissional)
- **Secundária:** `#F0F4F8` (Cinza claro)
- **Accent:** `#4CAF50` (Verde sucesso), `#F44336` (Vermelho reprovação)
- **Texto:** `#333333` (Dark gray), `#666666` (Medium gray)
- **Background:** `#FAFBFC`

#### Tipografia
- **Font Family:** Inter (Google Fonts) ou system-ui
- **Headings:** 24px (h1), 20px (h2), 16px (h3)
- **Body:** 14px-16px

#### Espaçamento
- **Container padding:** 24px
- **Element gaps:** 16px
- **Border radius:** 8px (cards), 4px (inputs)

#### Sombras
- Card: `0 2px 8px rgba(0,0,0,0.08)`
- Hover: `0 4px 16px rgba(0,0,0,0.12)`

### 2.3 Componentes

| Componente | Estados | Comportamento |
|------------|---------|---------------|
| Input (idade) | default, focus, error, disabled | Validação 18-120 anos |
| Input (renda) | default, focus, error | Formato monetário |
| Select (histórico) | default, focus | Options: limpo, negativado |
| Input (valor) | default, focus, error | Formato monetário |
| Button Submit | default, hover, loading, disabled | Chama análise |
| Result Card | approved, rejected | Exibe resultado com animação |
| Log Item | default | Lista histórica de análises |

---

## 3. Especificação Funcional

### 3.1 Campos do Formulário

| Campo | Tipo | Validação | Obrigatório |
|-------|------|-----------|--------------|
| Idade | number | >= 18 e <= 120 | Sim |
| Renda Mensal | number | > 0 | Sim |
| Histórico de Dívidas | select | "limpo" ou "negativado" | Sim |
| Valor do Empréstimo | number | > 0 | Sim |

### 3.2 Regras de Negócio

```
CONDIÇÕES PARA APROVAÇÃO:
1. Idade >= 18 anos
2. Parcela mensal (empréstimo / 12) <= 30% da renda mensal
3. Histórico de dívidas == "limpo"

RESULTADO:
- Aprovado: Todas as condições atendidas
- Reprovado: Qualquer condição não atendida
```

### 3.3 Cálculos

```typescript
// Parcela mensal = valor do empréstimo / 12
parcelaMensal = valorEmprestimo / 12

// Porcentagem comprometida
porcentagemComprometida = (parcelaMensal / rendaMensal) * 100

// Aprovação
aprovado = (idade >= 18) && 
           (porcentagemComprometida <= 30) && 
           (historicoDividas === 'limpo')
```

### 3.4 Sistema de Logs

**Estrutura do Log:**
```typescript
interface CreditLog {
  id: string;
  timestamp: string; // ISO 8601
  clientData: {
    age: number;
    monthlyIncome: number;
    debtHistory: 'limpo' | 'negativado';
    loanAmount: number;
  };
  analysis: {
    monthlyPayment: number;
    percentageOfIncome: number;
    approved: boolean;
    reasons: string[];
  };
}
```

**Armazenamento:**
- Primary: LocalStorage (browser)
- Backup: API endpoint `/api/logs` (arquivo JSON em server)

---

## 4. Arquitetura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Página principal
│   ├── layout.tsx               # Layout raiz
│   ├── globals.css              # Estilos globais
│   └── api/
│       └── logs/
│           ├── route.ts         # GET/POST logs
│           └── route.ts         # GET/POST logs
├── components/
│   ├── CreditForm.tsx          # Formulário de análise
│   ├── ResultDisplay.tsx       # Exibição de resultado
│   ├── LogHistory.tsx          # Histórico de logs
│   └── ui/                     # Componentes base
│       ├── Input.tsx
│       ├── Select.tsx
│       └── Button.tsx
├── lib/
│   ├── creditAnalysis.ts       # Lógica de negócio
│   ├── logStorage.ts           # Armazenamento de logs
│   └── types.ts                # TypeScript types
└── data/
    └── logs.json               # Persistência backend
```

---

## 5. Critérios de Aceitação

### Funcional
- [ ] Formulário com todos os campos descritos
- [ ] Validação de idade >= 18
- [ ] Cálculo de parcela em 12x
- [ ] Verificação de comprometimento <= 30%
- [ ] Verificação de histórico limpo
- [ ] Resultado "Aprovado" ou "Reprovado"
- [ ] Registro de logs com timestamp
- [ ] Exibição de histórico de análises

### Visual
- [ ] Layout responsivo
- [ ] Feedback visual para aprovado (verde)
- [ ] Feedback visual para reprovado (vermelho)
- [ ] Animações suaves no resultado

### Técnico
- [ ] Código modularizado
- [ ] TypeScript com tipos definidos
- [ ] Comentários explicativos
- [ ] README.md com instruções