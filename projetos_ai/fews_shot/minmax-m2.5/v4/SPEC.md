# Especificação do Projeto: Sistema de Análise de Crédito

## 1. Visão Geral do Projeto
- **Nome**: Credit Analysis System
- **Tipo**: Aplicação Web com Next.js
- **Resumo**: Sistema para análise de crédito de clientes com validação de dados, regras de negócio e registro de logs
- **Usuários**: Público geral que solicita análise de crédito

## 2. Especificação UI/UX

### Estrutura de Layout
- **Header**: Título do sistema centralizado
- **Main**: Formulário de análise + área de resultado
- **Footer**: Informações de direitos autorais

### Design Visual
- **Paleta de Cores**:
  - Primária: #1e3a5f (azul escuro)
  - Secundária: #f8f9fa (cinza claro)
  - Acento sucesso: #28a745 (verde)
  - Acento erro: #dc3545 (vermelho)
  - Fundo: #ffffff
  - Texto: #333333
- **Tipografia**:
  - Font-family: system-ui, -apple-system, sans-serif
  - Título: 2rem, bold
  - Subtítulos: 1.25rem, semibold
  - Corpo: 1rem, regular
- **Espaçamento**:
  - Container padding: 2rem
  - Element spacing: 1rem
  - Form gap: 1.5rem

### Componentes
- **Formulário**:
  - Campo idade (number)
  - Campo renda mensal (number)
  - Select histórico de dívida (limpo/negativado)
  - Campo valor empréstimo (number)
  - Botão Submit
- **Resultado**: Card com status aprovado/reprovado
- **Histórico**: Lista de análises anteriores

## 3. Especificação Funcional

### Regras de Negócio
1. **Validação de Idade**: Cliente deve ter 18+ anos
2. **Análise de Parcela**: Parcela (12x) não pode comprometer mais de 30% da renda
3. **Histórico**: Apenas clientes com histórico "limpo" são aprovados
4. **Aprovação**: Todas as condições devem ser verdadeiras

### Validações
- Todos os campos obrigatórios
- Valores numéricos positivos
- Renda mensal > 0
- Valor empréstimo > 0
- Idade entre 0 e 120

### Dados para Log
- Data/hora da análise
- Dados do cliente (idade, renda, histórico, valor)
- Resultado (aprovado/reprovado)
- Motivo da reprovação (se aplicável)

## 4. Estrutura de Arquivos
```
/src
  /validation
    creditValidation.ts
  /services
    creditService.ts
  /repository
    logRepository.ts
  /components
    CreditForm.tsx
    ResultCard.tsx
    LogList.tsx
  /app
    page.tsx
    layout.tsx
    globals.css
  /types
    credit.ts
```

## 5. Critérios de Aceitação
- [x] Formulário com todos os campos especificados
- [x] Validação de idade mínima (18 anos)
- [x] Cálculo de comprometimento de renda (30%)
- [x] Verificação de histórico de dívidas
- [x] Exibição de resultado Approved/Declined
- [x] Registro de logs em LocalStorage
- [x] Exibição de histórico de análises
- [x] Interface responsiva
- [x] Código modular separado por responsabilidade