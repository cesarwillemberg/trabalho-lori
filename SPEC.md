# Sistema de Análise de Crédito

## 1. Visão Geral do Projeto

Aplicação web completa para análise de crédito de clientes, desenvolvida com Next.js. O sistema avalia solicitações de empréstimo com base em critérios específicos de elegibilidade, registr每 um log de todas as análises realizadas.

## 2. Especificação de UI/UX

### Estrutura de Layout
- **Header**: Logo/título do sistema centralizado
- **Main**: Container principal com formulário e área de resultado
- **Footer**: Créditos e informações adicionais

### Design Visual
- **Paleta de Cores**:
  - Primária: `#1e3a5f` (azul escuro)
  - Secundária: `#2d5a87` (azul médio)
  - Accent: `#4CAF50` (verde - aprovado)
  - Error: `#f44336` (vermelho - reprovado)
  - Background: `#f5f7fa` (cinza claro)
  - Card: `#ffffff` (branco)
  - Texto: `#333333` (cinza escuro)

- **Tipografia**:
  - Font family: system-ui, sans-serif
  - Headings: 24px-32px bold
  - Body: 16px regular
  - Labels: 14px medium

- **Spacing**:
  - Container padding: 24px
  - Card padding: 32px
  - Form field gap: 16px

### Componentes
- **Formulário de Análise**:
  - Campo Idade (number, 0-150)
  - Campo Renda Mensal (currency, R$)
  - Campo Histórico de Dívidas (select: "limpo", "negativado")
  - Campo Valor do Empréstimo (currency, R$)
  - Botão "Analisar Crédito"

- **Área de Resultado**:
  - Status visual (verde/vermelho)
  - Mensagem explicativa
  - Detalhes da análise

- **Área de Logs**:
  - Tabela com histórico de análises
  - Data/hora, dados do cliente, resultado

## 3. Especificação Funcional

### Regras de Negócio

| Regra | Condição | Resultado |
|-------|----------|-----------|
| Idade | >= 18 anos | Aprovado |
| Parcela | <= 30% da renda | Aprovado |
| Histórico | "limpo" | Aprovado |

**Fórmula de Cálculo**:
```
valorParcela = valorEmprestimo / 12
percentualComprometimento = (valorParcela / rendaMensal) * 100
```

### Fluxo de Execução
1. Usuário preenche formulário
2. Sistema valida dados de entrada
3. Sistema executa análise de crédito
4. Sistema exibe resultado
5. Sistema registra log da análise

## 4. Estrutura de Arquivos

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
│   ├── repository/
│   │   └── creditRepository.ts
│   ├── types/
│   │   └── credit.ts
│   └── components/
│       ├── CreditForm.tsx
│       ├── CreditResult.tsx
│       └── CreditLogs.tsx
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 5. Critérios de Aceitação

- [ ] Formulário com todos os campos necessários
- [ ] Validação de idade >= 18 anos
- [ ] Cálculo de parcela (12x) não excedendo 30% da renda
- [ ] Verificação de histórico de dívidas
- [ ] Exibição clara de resultado (Aprovado/Reprovado)
- [ ] Registro de log com data/hora, dados e resultado
- [ ] Interface responsiva e intuitiva
- [ ] Código modularizado com separação de responsabilidades
