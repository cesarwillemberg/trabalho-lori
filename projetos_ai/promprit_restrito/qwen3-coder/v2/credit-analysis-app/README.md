# Credit Analysis Application - Next.js

## Project Structure

```
credit-analysis/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main page (UI Layer)
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── CreditForm.tsx        # Form component (UI Layer)
│   │   └── ResultDisplay.tsx     # Result display (UI Layer)
│   ├── layers/
│   │   ├── validation/
│   │   │   └── creditValidation.ts  # Validation Layer
│   │   ├── service/
│   │   │   └── creditService.ts     # Business Logic Layer
│   │   └── repository/
│   │       └── logRepository.ts      # Persistence Layer
│   └── types/
│       └── credit.ts             # TypeScript types
├── package.json
└── README.md
```

## Layers Explanation

### 1. Validation Layer (src/layers/validation/)
Responsible for input validation only. Contains pure functions that validate data without any business logic.

### 2. Service Layer (src/layers/service/)
Contains all business rules. Calculates installments, checks debt history, and determines approval. Does NOT access storage directly.

### 3. Repository Layer (src/layers/repository/)
Handles all persistence operations. Abstracts LocalStorage/API access from the rest of the application.

### 4. UI Layer (src/components/ and src/app/)
Renders the interface and captures user input. Delegates all processing to the Service layer.

## Setup Instructions

```bash
# Create Next.js project
npx create-next-app@latest credit-analysis
cd credit-analysis

# Choose these options:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind: Yes
# - src/ directory: Yes
# - App Router: Yes

# Run the application
npm run dev
```

## Usage

1. Access http://localhost:3000
2. Fill in the form:
   - Age (must be 18+)
   - Monthly income
   - Debt history (clean or negative)
   - Loan amount requested
3. Click "Analisar Crédito"
4. View the result and logs
