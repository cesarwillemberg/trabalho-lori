# Credit Analysis Application - Specification

## 1. Project Overview

- **Project Name**: Credit Analysis App
- **Type**: Full-stack web application (Next.js)
- **Core Functionality**: Evaluate credit eligibility based on age, income, debt history, and loan amount
- **Target Users**: Financial institutions, loan officers, customers seeking credit

## 2. UI/UX Specification

### Layout Structure

- **Header**: App title and logo
- **Main Content**: Centered card with form and results
- **Footer**: Copyright and credits

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**:
- Primary: `#1E3A5F` (Deep blue)
- Secondary: `#2ECC71` (Green for approved)
- Accent: `#E74C3C` (Red for rejected)
- Background: `#F8FAFC` (Light gray)
- Card Background: `#FFFFFF` (White)
- Text Primary: `#1F2937` (Dark gray)
- Text Secondary: `#6B7280` (Medium gray)
- Border: `#E5E7EB` (Light border)

**Typography**:
- Font Family: "Inter", system-ui, sans-serif
- Heading (H1): 32px, bold
- Heading (H2): 24px, semibold
- Body: 16px, regular
- Small: 14px, regular

**Spacing System**:
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48px

**Visual Effects**:
- Card shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- Border radius: 12px (cards), 8px (inputs/buttons)
- Transitions: 200ms ease-in-out

### Components

**Form Fields**:
- Age (number input)
- Monthly Income (currency input)
- Debt History (select: "limpo" or "negativado")
- Loan Amount (currency input)

**Buttons**:
- Primary: Submit button with hover state
- Secondary: Clear/Reset button

**Result Display**:
- Approved: Green background, check icon, success message
- Rejected: Red background, X icon, reason explanation

**Log Table**:
- Columns: Date, Age, Income, Debt History, Loan Amount, Result
- Sortable by date
- Pagination if needed

## 3. Functionality Specification

### Core Features

1. **Credit Analysis Form**
   - Input validation (all fields required)
   - Age must be >= 18
   - Monthly income > 0
   - Loan amount > 0

2. **Credit Evaluation Logic**
   - Rule 1: Age >= 18 (must be adult)
   - Rule 2: Monthly payment (12 installments) <= 30% of income
   - Rule 3: Debt history must be "limpo" (no restrictions)
   - All rules must pass for approval

3. **Result Display**
   - Show approval/rejection status
   - Display breakdown of each rule
   - Show calculated values (installment amount, percentage)

4. **Log System**
   - Record each analysis with timestamp
   - Store: date, age, income, debt history, loan amount, result
   - Persist in LocalStorage
   - Display history in table format

### User Interactions
- Fill form → Validate → Submit → Show result
- View log history
- Clear form for new analysis
- Export logs (optional)

### Edge Cases
- Empty form submission → Show validation errors
- Negative numbers → Reject with message
- Very large numbers → Handle gracefully
- LocalStorage unavailable → Fallback to memory

## 4. Acceptance Criteria

1. ✅ Form displays all required fields
2. ✅ Validation prevents invalid submissions
3. ✅ Age < 18 shows "Reprovado - Menor de idade"
4. ✅ Payment > 30% income shows "Reprovado - Parcela muito alta"
5. ✅ Debt history "negativado" shows "Reprovado - Histórico negativado"
6. ✅ All conditions met shows "Aprovado"
7. ✅ Each analysis is logged with complete data
8. ✅ Logs persist across page reloads
9. ✅ UI is responsive on mobile/tablet/desktop
10. ✅ Clear instructions for running the project

## 5. Technical Architecture

### Frontend (Next.js)
- Pages: Home (form), History (logs)
- Components: Form, ResultCard, LogTable
- Hooks: useCreditAnalysis, useLogs

### Backend (API Routes)
- GET /api/logs - Retrieve all logs
- POST /api/logs - Add new log entry
- DELETE /api/logs - Clear all logs

### Data Storage
- Primary: LocalStorage (client-side persistence)
- File: Backend writes to JSON file for persistence

### Project Structure
```
/src
  /app
    page.tsx
    history/page.tsx
    layout.tsx
    globals.css
  /components
    CreditForm.tsx
    ResultCard.tsx
    LogTable.tsx
    Header.tsx
  /lib
    creditAnalysis.ts (business logic)
    storage.ts (localStorage wrapper)
    types.ts (TypeScript interfaces)
  /api
    /logs
      route.ts
```