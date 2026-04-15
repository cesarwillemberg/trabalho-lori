# Credit Analysis Application - SPEC.md

## 1. Project Overview

**Project Name:** Credit Analysis System
**Type:** Web Application (Next.js)
**Core Functionality:** Analyze credit eligibility based on age, income, debt history, and loan amount
**Target Users:** Financial institutions, credit analysts, customers seeking credit

## 2. UI/UX Specification

### Layout Structure

- **Header:** App title with credit analysis icon
- **Main Content:** Centered card with form and results
- **Footer:** Simple copyright

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Background: `#0f0f0f` (near black)
- Card Background: `#1a1a1a` (dark gray)
- Primary: `#22c55e` (green - approval)
- Secondary: `#ef4444` (red - rejection)
- Accent: `#3b82f6` (blue - interactive elements)
- Text Primary: `#ffffff`
- Text Secondary: `#a1a1aa`
- Border: `#27272a`

**Typography:**
- Font Family: System UI with fallback to sans-serif
- Headings: Bold, larger sizes
- Body: Regular weight, readable size
- Form Labels: Medium weight, smaller size

**Spacing:**
- Container padding: 2rem
- Form gap: 1.5rem
- Button padding: 0.75rem 1.5rem

**Visual Effects:**
- Card shadow: subtle dark shadow
- Input focus: blue glow ring
- Button hover: slight brightness increase
- Result animation: fade-in effect

### Components

1. **Form Fields:**
   - Age (number input)
   - Monthly Income (currency input)
   - Debt History (select: "limpo" / "negativado")
   - Loan Amount (currency input)

2. **Submit Button:**
   - Full width on mobile
   - Blue accent color
   - Loading state

3. **Result Display:**
   - Approved: Green background, checkmark icon
   - Rejected: Red background, X icon
   - Shows reasoning for each condition

4. **Log Section:**
   - Collapsible table showing history
   - Date, age, income, loan, result columns

## 3. Functionality Specification

### Core Features

1. **Credit Analysis Engine:**
   - Age validation: Must be >= 18 years
   - Income check: Installment (loan/12) must be <= 30% of monthly income
   - Debt history: Must be "limpo" (no restrictions)

2. **Approval Logic:**
   - All 3 conditions must pass = Approved
   - Any condition fails = Rejected

3. **Logging System:**
   - Store in LocalStorage (client-side)
   - Log format: timestamp, age, income, loanAmount, debtHistory, result, reason

4. **Log Display:**
   - Show last 10 analyses
   - Clear logs option

### User Interactions
- Fill form fields
- Click "Analisar Crédito" button
- View result with reasoning
- Expand/collapse log section

### Edge Cases
- Empty fields: Show validation message
- Negative numbers: Prevent input
- Very large numbers: Handle gracefully

## 4. Technical Architecture

### Project Structure
```
/credit-analysis-app
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── CreditForm.tsx
│   │   ├── ResultDisplay.tsx
│   │   └── LogTable.tsx
│   ├── lib/
│   │   ├── creditAnalysis.ts
│   │   └── storage.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
└── next.config.js
```

### Separation of Concerns
- **Components:** UI rendering only
- **Lib:** Business logic (analysis engine, storage)
- **Types:** TypeScript interfaces

## 5. Acceptance Criteria

1. ✅ Form renders with all 4 required fields
2. ✅ Submit button triggers analysis
3. ✅ Age < 18 shows rejection
4. ✅ Installment > 30% income shows rejection
5. ✅ "negativado" history shows rejection
6. ✅ All conditions pass shows approval
7. ✅ Result displays reasoning
8. ✅ Logs persist in LocalStorage
9. ✅ Logs display in collapsible section
10. ✅ Responsive design works on mobile