# Credit Analysis System

Complete web application developed with Next.js for customer credit analysis and approval.

## Features

- **Analysis Form**: Collects customer data (age, monthly income, debt history, loan amount)
- **Business Logic**: Validations and approval rules:
  - Minimum age of 18 years
  - Monthly installment (12x) cannot exceed 30% of income
  - Debt history must be "clean"
- **Visual Result**: Displays "Approved" or "Rejected" with analysis details
- **Log System**: Records all analyses performed with date/time and complete data

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── logs/
│           └── route.ts      # Logs API
├── components/
│   ├── CreditForm.tsx       # Credit form
│   ├── ResultDisplay.tsx    # Result display
│   ├── LogHistory.tsx       # Analysis history
│   └── ui/
│       ├── Input.tsx        # Input component
│       ├── Select.tsx       # Select component
│       └── Button.tsx       # Button component
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── creditAnalysis.ts   # Business logic
│   └── logStorage.ts        # Log storage
└── data/
    └── logs.json            # Backend persistence
```

## Requirements

- Node.js 18+
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository>
cd <folder>
```

2. Install dependencies:
```bash
npm install
```

## Running

### Development
```bash
npm run dev
```
Access: http://localhost:3000

### Production
```bash
npm run build
npm start
```

## Analysis Rules

| Condition | Rule |
|-----------|------|
| Age | Minimum 18 years |
| Installment | Maximum 30% of monthly income (12 installments) |
| History | Must be "clean" |

## Technologies

- Next.js 16 (App Router)
- TypeScript
- CSS Modules (no Tailwind)
- LocalStorage (browser)
- API Routes (JSON persistence)

## License

MIT