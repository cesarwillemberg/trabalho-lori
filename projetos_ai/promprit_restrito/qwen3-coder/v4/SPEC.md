# Especificação - Sistema de Análise de Crédito

## 1. Visão Geral do Projeto

- **Nome do Projeto**: Credit Analysis App
- **Tipo**: Aplicação Web com Next.js (App Router)
- **Funcionalidade Principal**: Sistema para análise de crédito de clientes com validação de dados, cálculo de parcelas e registro de logs
- **Usuários Alvo**: Instituições financeiras, analistas de crédito

## 2. Especificação UI/UX

### Estrutura de Layout
- **Header**: Título "Análise de Crédito" centralizado
- **Main**: Container central com formulário e resultado
- **Footer**: Informações sobre a aplicação

### Design Visual
- **Paleta de Cores**:
  - Primária: #1a1a2e (dark blue)
  - Secundária: #16213e (navy)
  - Accent: #0f3460 (deep blue)
  - Sucesso: #00d9a5 (teal green)
  - Erro: #ff6b6b (coral red)
  - Fundo: #f8f9fa (light gray)
  - Texto: #2d3748 (dark gray)
- **Tipografia**: 
  - Fontes: System UI, sans-serif
  - Headings: 1.5rem - 2rem
  - Body: 1rem
- **Espaçamento**: 16px base, 24px container padding
- **Efeitos**: Box shadow suave, border-radius 8px

### Componentes
- **Formulário**: Campos com labels, inputs estilizados, botão de submit
- **Cartão de Resultado**: Exibição do status com ícone e cor distintiva
- **Histórico de Análises**: Lista de análises anteriores com scroll

## 3. Especificação de Funcionalidades

### Campos do Formulário
1. **Idade** (number): Idade do cliente
2. **Renda Mensal** (number): Renda mensal em reais
3. **Histórico de Dívidas** (select): "limpo" ou "negativado"
4. **Valor do Empréstimo** (number): Valor solicitado em reais

### Regras de Negócio
- Validar idade mínima de 18 anos
- Calcular parcela = valor empréstimo / 12
- Verificar se parcela > 30% da renda → reprovar
- Verificar histórico "negativado" → reprovar
- Aprovar apenas se todas condições atendidas

### Fluxo de Dados
1. Usuário preenche formulário
2. Validação dos campos
3. Aplicação das regras de negócio
4. Exibição do resultado
5. Registro do log

## 4. Arquitetura de Camadas

```
src/
├── app/
│   └── page.tsx              (UI - Componente React)
├── components/
│   └── CreditForm.tsx        (UI - Componente de formulário)
├── services/
│   └── CreditService.ts      (Service - Regras de negócio)
├── validation/
│   └── CreditValidation.ts   (Validation - Validações)
├── repositories/
│   └── LogRepository.ts      (Repository - Persistência LocalStorage)
├── types/
│   └── index.ts             (Types - Tipos TypeScript)
└── utils/
    └── formatters.ts        (Utils - Funções utilitárias)
```

## 5. Critérios de Aceitação

- [ ] Formulário com todos os campos funcionando
- [ ] Validação de idade mínima (18 anos)
- [ ] Cálculo correto de parcela (12x)
- [ ] Verificação 30% renda
- [ ] Verificação histórico de dívidas
- [ ] Exibição de resultado "Aprovado" ou "Reprovado"
- [ ] Registro de logs com data/hora e dados
- [ ] Persistência funcionando
- [ ] Código em camadas separadas
- [ ] Sem IFs aninhados além de 2 níveis
- [ ] Funções com máximo 10 linhas