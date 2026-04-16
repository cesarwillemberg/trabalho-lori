# SPEC.md - Sistema de Análise de Crédito

## 1. Project Overview

**Project Name:** Credit Analysis System  
**Type:** Web Application (Next.js)  
**Core Functionality:** Evaluate credit applications based on age, income, debt history, and loan amount  
**Target Users:** Bank employees or credit analysts

## 2. UI/UX Specification

### Layout Structure

- Single page with centered content
- Header with application title
- Main content: form card + result card
- Responsive design (mobile-first)

### Visual Design

**Color Palette:**
- Primary: `#1E3A5F` (dark blue)
- Secondary: `#4A90A4` (teal)
- Background: `#F0F4F8` (light gray)
- Card Background: `#FFFFFF`
- Success: `#2ECC71` (green)
- Error: `#E74C3C` (red)
- Text: `#2C3E50`

**Typography:**
- Font Family: System fonts (Segoe UI, -apple-system, sans-serif)
- Heading: 24px bold
- Body: 16px regular
- Labels: 14px medium

**Spacing:**
- Container padding: 24px
- Card padding: 20px
- Form field gap: 16px

### Components

1. **Header**
   - Title: "Análise de Crédito"
   - Subtitle: "Sistema de avaliação de crédito"

2. **Form Card**
   - Title: "Dados do Cliente"
   - Fields:
     - Idade (number input, min 18, max 120)
     - Renda Mensal (currency input)
     - Histórico de Dívidas (select: "limpo" | "negativado")
     - Valor do Empréstimo (currency input)
   - Button: "Analisar Crédito"

3. **Result Card**
   - Title: "Resultado da Análise"
   - Shows status: "Aprovado" (green) or "Reprovado" (red)
   - Shows details when approved:
     - Valor da parcela
     - Comprometimento de renda

4. **Validation Messages**
   - Inline error messages below each field
   - Toast-style general errors

## 3. Functionality Specification

### Core Features

1. **Form Validation**
   - Age: required, 18-120
   - Income: required, positive number
   - Debt history: required, must be "limpo" or "negativado"
   - Loan amount: required, positive number

2. **Credit Analysis Logic (Service Layer)**
   - Calculate installment: loanAmount / 12
   - Calculate income percentage: (installment / income) * 100
   - Check age >= 18
   - Check installment <= 30% of income
   - Check debt history = "limpo"
   - Approve only if ALL conditions pass

3. **Logging (Repository Layer)**
   - Log format: { timestamp, age, income, debtHistory, loanAmount, result, details }
   - Store in LocalStorage as JSON array
   - Key: "credit_analysis_logs"

### User Interactions

1. User fills form fields
2. User clicks "Analisar Crédito"
3. System validates inputs
4. If valid: run credit analysis, show result, save log
5. If invalid: show validation errors

### Data Flow

```
UI Layer (Form) 
  → Validation Layer (validateInput)
  → Service Layer (analyzeCredit)
  → Repository Layer (saveLog, getLogs)
  → UI Layer (display result)
```

## 4. Architecture - Layer Separation

```
src/
├── app/
│   ├── page.tsx           # UI Layer
│   ├── globals.css
├── layers/
│   ├── validation/
│   │   └── creditValidation.ts
│   ├── service/
│   │   └── creditService.ts
│   └── repository/
│       └── creditRepository.ts
```

### Layer Responsibilities

1. **UI Layer (app/page.tsx)**
   - Render form and result components
   - Handle user input state
   - Call validation and service
   - Display errors and results
   - NO business logic

2. **Validation Layer (layers/validation/)**
   - Validate input formats
   - Check required fields
   - Return validation errors
   - NO business decisions

3. **Service Layer (layers/service/)**
   - Execute credit analysis rules
   - Calculate installment and percentages
   - Determine approval/rejection
   - NO direct storage access

4. **Repository Layer (layers/repository/)**
   - Save logs to LocalStorage
   - Retrieve logs
   - Handle JSON serialization
   - ONLY storage operations

## 5. Acceptance Criteria

- [ ] Form displays all 4 required fields
- [ ] Validation prevents submission with invalid data
- [ ] Age < 18 shows error
- [ ] Installment > 30% income shows rejection
- [ ] "negativado" history shows rejection
- [ ] Approved shows green "Aprovado" status
- [ ] Rejected shows red "Reprovado" status
- [ ] Logs are saved to LocalStorage
- [ ] Each function follows 10-line max rule
- [ ] No more than 2 nested IF levels
- [ ] Clear layer separation maintained