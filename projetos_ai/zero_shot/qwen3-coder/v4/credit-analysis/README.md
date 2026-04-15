# Credit Analysis Application

A complete web application built with Next.js for analyzing client credit eligibility based on age, income, debt history, and requested loan amount.

## Features

- **Credit Analysis Form**: Collects client data including age, monthly income, debt history status, and requested loan amount
- **Automated Credit Evaluation**: Applies business rules to determine credit eligibility
- **Real-time Results**: Displays approval/rejection status with detailed reasons
- **Analysis Logging**: Records all analyses with timestamps, client data, and results to a JSON file
- **Responsive Design**: Works on desktop and mobile devices

## Business Rules

The credit analysis evaluates three conditions:

1. **Age Validation**: Client must be 18 years or older
2. **Income Ratio**: Loan installments (divided into 12 fixed payments) cannot exceed 30% of monthly income
3. **Debt History**: Client must have a clean debt history ("limpo")

Credit is approved only if ALL conditions are met.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd credit-analysis
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
credit-analysis/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analise/
│   │   │       └── route.ts          # API endpoint for credit analysis
│   │   ├── page.tsx                   # Main page with form and result display
│   │   ├── layout.tsx                 # Root layout component
│   │   └── globals.css                # Global styles
│   ├── components/
│   │   ├── CreditForm.tsx             # Form component for client data input
│   │   └── AnalysisResult.tsx         # Result display component
│   └── lib/
│       ├── creditAnalysis.ts          # Core business logic for credit analysis
│       └── logger.ts                  # Logging system with JSON file persistence
├── data/
│   └── analysis-logs.json             # Stored analysis logs (auto-created)
├── package.json                       # Project dependencies and scripts
└── README.md                          # This file
```

## API Endpoint

### POST `/api/analise`

Analyzes credit eligibility based on provided client data.

**Request Body:**
```json
{
  "idade": 25,
  "rendaMensal": 5000,
  "historicoDividas": "limpo",
  "valorEmprestimo": 10000
}
```

**Success Response (200):**
```json
{
  "logId": "1234567890",
  "aprovado": true,
  "motivos": ["Todas as condições para aprovação foram atendidas."],
  "numeroParcelas": 12,
  "valorParcela": 833.33,
  "percentualRendaComprometida": 16.67
}
```

**Error Response (400):**
```json
{
  "error": "Dados inválidos",
  "detalhes": ["Idade deve ser um valor positivo."]
}
```

## Modules

### Credit Analysis Logic (`src/lib/creditAnalysis.ts`)

Contains the core business logic:
- `analisarCredito()`: Performs the credit evaluation
- `validarDadosCredito()`: Validates input data
- Interfaces for request and result data

### Logger (`src/lib/logger.ts`)

Handles logging to JSON file:
- `createAndSaveLog()`: Creates and persists log entries
- `readLogs()`: Retrieves all log entries
- `appendLog()`: Adds a new log entry

## Log Format

Each log entry contains:
- `id`: Unique timestamp-based identifier
- `dataHora`: ISO timestamp of the analysis
- `idade`: Client age
- `rendaMensal`: Monthly income
- `historicoDividas`: Debt history status
- `valorEmprestimo`: Requested loan amount
- `resultado`: "Aprovado" or "Reprovado"
- `motivos`: Array of decision reasons
- `numeroParcelas`: Number of installments (12)
- `valorParcela`: Installment amount
- `percentualRendaComprometida`: Income percentage committed

## Technologies Used

- **Next.js**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Node.js fs**: File system operations for logging

## License

This project is for educational purposes.
