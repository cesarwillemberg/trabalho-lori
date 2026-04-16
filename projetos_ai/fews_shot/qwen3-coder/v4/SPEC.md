# Sistema de Análise de Crédito

## 1. Concept & Vision

Sistema web profissional para análise de crédito de clientes com interface limpa e intuitiva. A experiência transmite confiança e clareza, com feedback visual imediato sobre o resultado da análise. O design é minimalista com toques de cor que indicam aprovação (verde) ou reprovação (vermelho).

## 2. Design Language

### Aesthetic Direction
Interface moderna e profissional inspirada em dashboards financeiros. Clean, com hierarquia visual clara e elementos de feedback de status bem definidos.

### Color Palette
- **Primary**: `#2563eb` (azul profissional)
- **Success**: `#10b981` (verde aprovação)
- **Error**: `#ef4444` (vermelho reprovação)
- **Background**: `#f8fafc` (cinza claro)
- **Card Background**: `#ffffff`
- **Text Primary**: `#1e293b`
- **Text Secondary**: `#64748b`
- **Border**: `#e2e8f0`

### Typography
- **Headings**: Inter (700)
- **Body**: Inter (400, 500)
- **Monospace**: JetBrains Mono (para valores)

### Motion Philosophy
- Transições suaves de 200-300ms para estados de hover e feedback
- Animação de fade-in para resultado da análise
- Pulse sutil no botão durante loading

## 3. Layout & Structure

### Page Structure
1. **Header**: Logo/título do sistema
2. **Main Content**:
   - Card de formulário (esquerda)
   - Card de resultado (direita, visível após análise)
3. **Footer**: Informações de versão

### Responsive Strategy
- Desktop: Layout em 2 colunas
- Tablet/Mobile: Layout em coluna única

## 4. Features & Interactions

### Formulário de Análise
- **Campos**:
  - Idade (number, 0-120)
  - Renda Mensal (currency, R$)
  - Histórico de Dívidas (select: "Limpo" | "Negativado")
  - Valor do Empréstimo (currency, R$)

### Regras de Negócio
1. **Maior de idade**: Idade >= 18 anos
2. **Parcela <= 30% da renda**: (Empréstimo / 12) <= (Renda * 0.30)
3. **Sem restrições**: Histórico = "Limpo"

### Resultado
- **Aprovado**: Verde, ícone de check, mensagem positiva
- **Reprovado**: Vermelho, ícone de X, lista de motivos

### Log de Análises
- Armazenado em LocalStorage
- Exibido em tabela na interface
- Colunas: Data/Hora, Idade, Renda, Histórico, Valor, Resultado

## 5. Component Inventory

### InputField
- Estados: default, focus, error, disabled
- Label acima, placeholder, mensagem de erro abaixo

### SelectField
- Estados: default, focus, error, disabled
- Estilo customizado com dropdown

### Button
- Estados: default, hover, active, loading, disabled
- Loading: spinner + texto "Analisando..."

### ResultCard
- Estados: hidden, approved, rejected
- Animação de entrada

### LogTable
- Tabela responsiva com scroll horizontal em mobile
- Linhas alternadas com zebra striping

## 6. Technical Approach

### Stack
- Next.js 14+ (App Router)
- TypeScript
- CSS Modules

### Architecture (Clean Architecture)
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/            # Componentes UI
│   ├── CreditForm/
│   ├── ResultCard/
│   ├── LogTable/
│   └── ui/               # Componentes base
├── domain/                # Entidades e tipos
│   └── CreditAnalysis.ts
├── services/             # Lógica de negócio
│   └── creditService.ts
├── validation/          # Validações
│   └── creditValidation.ts
├── utils/               # Utilitários
│   ├── logger.ts
│   └── formatters.ts
└── repository/          # Persistência
    └── logRepository.ts
```

### Data Flow
1. Usuário preenche formulário
2. Validação dos campos
3. Serviço de crédito processa análise
4. Resultado é exibido
5. Log é registrado no LocalStorage
6. Tabela de logs é atualizada
