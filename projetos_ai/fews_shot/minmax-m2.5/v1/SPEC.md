# Credit Analysis Application - Specification

## 1. Project Overview

**Project Name:** Credit Analysis Web Application
**Type:** Web Application (Next.js)
**Core Functionality:** Analyze credit applications by validating age, income, debt history, and loan amount to approve or reject credit requests.
**Target Users:** Financial institutions, credit analysts, or any entity needing credit evaluation.

---

## 2. UI/UX Specification

### Layout Structure

- **Header:** Simple header with application title "Análise de Crédito"
- **Main Content:** Centered card containing the credit analysis form
- **Footer:** Minimal footer with copyright info
- **Responsive Breakpoints:**
  - Mobile: < 640px (single column, full width)
  - Tablet: 640px - 1024px
  - Desktop: > 1024px (max-width: 600px centered)

### Visual Design

**Color Palette:**
- Primary: #1e3a5f (dark blue)
- Secondary: #2d5a87 (medium blue)
- Accent: #10b981 (green for approval)
- Error: #ef4444 (red for rejection)
- Background: #f8fafc (light gray)
- Card Background: #ffffff
- Text Primary: #1e293b
- Text Secondary: #64748b
- Border: #e2e8f0

**Typography:**
- Font Family: system-ui, -apple-system, sans-serif
- Heading (h1): 2rem, font-weight: 700
- Heading (h2): 1.5rem, font-weight: 600
- Body: 1rem, font-weight: 400
- Small: 0.875rem

**Spacing System:**
- Base unit: 4px
- Padding (card): 24px
- Gap: 16px
- Margin bottom: 16px

**Visual Effects:**
- Card shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Input focus: ring-2 ring-blue-500
- Button hover: opacity 0.9
- Transition: all 0.2s ease

### Components

**Form Fields:**
- Age (number input)
- Monthly Income (currency input)
- Debt History (select: "limpo" or "negativado")
- Loan Amount (currency input)

**Buttons:**
- Submit button: primary style, full width
- States: default, hover, disabled

**Result Display:**
- Success box (green background) for approved
- Error box (red background) for rejected
- Shows decision message

**Logs Display:**
- Expandable section showing analysis history
- Table format with date, age, income, debt history, loan amount, result

---

## 3. Functionality Specification

### Core Features

1. **Form Validation:**
   - Age: must be >= 18
   - Monthly Income: must be > 0
   - Debt History: must be "limpo" or "negativado"
   - Loan Amount: must be > 0

2. **Credit Analysis Rules:**
   - Rule 1: Customer must be 18 years or older
   - Rule 2: Monthly installment (12 fixed packages) must not exceed 30% of monthly income
   - Rule 3: Debt history must be "limpo" (no restrictions)
   - Approval requires ALL rules to pass

3. **Logging:**
   - Each analysis is logged with:
     - Timestamp (ISO format)
     - Customer data (age, income, debt history, loan amount)
     - Result (approved/rejected)
     - Reasons for rejection (if applicable)
   - Logs stored in localStorage

4. **Log History:**
   - Display past analyses
   - Show latest first
   - Clear logs option

### User Flow

1. User fills in the credit application form
2. User clicks "Analisar Crédito"
3. System validates all fields
4. System processes credit analysis based on rules
5. System displays approval or rejection result
6. System logs the analysis to localStorage
7. User can view log history

### Edge Cases

- Empty form fields: show validation errors
- Negative numbers: reject in validation
- Non-numeric input: handled by input type
- Very large numbers: accept but validate logically

---

## 4. Acceptance Criteria

1. ✓ Form displays all 4 required fields
2. ✓ Validation prevents submission with invalid data
3. ✓ Age < 18 results in rejection with appropriate message
4. ✓ Installment > 30% income results in rejection
5. ✓ Debt history "negativado" results in rejection
6. ✓ All conditions met results in approval
7. ✓ Each analysis logged to localStorage
8. ✓ Log history displays correctly
9. ✓ Responsive design works on mobile
10. ✓ No console errors on page load

---

## 5. Technical Architecture

### Project Structure

```
credit-analysis/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── validation/
│   │   └── creditValidation.ts
│   ├── service/
│   │   └── creditService.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── repository/
│   │   └── localStorageRepository.ts
├── package.json
├── tsconfig.json
├── next.config.js
└── SPEC.md
```

### Dependencies

- next: ^14.0.0
- react: ^18.0.0
- react-dom: ^18.0.0
- typescript: ^5.0.0