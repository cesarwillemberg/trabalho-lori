# Especificação - Sistema de Análise de Crédito

## 1. Visão Geral do Projeto

- **Nome**: Credit Analysis System
- **Tipo**: Aplicação Web Next.js
- **Funcionalidade**: Sistema de análise de crédito para aprovação ou reprovação de empréstimos pessoais
- **Usuários**: Operadores de crédito / Clientes

## 2. Especificação de UI/UX

### Estrutura de Layout
- Container centralizado com max-width 600px
- Header com título da aplicação
- Formulário de entrada de dados
- Área de resultado da análise
- Seção de histórico de análises (opcional)

### Design Visual
- **Cores**:
  - Primária: #2563EB (azul)
  - Secundária: #1E40AF (azul escuro)
  - Sucesso: #16A34A (verde)
  - Erro: #DC2626 (vermelho)
  - Fundo: #F8FAFC (cinza claro)
  - Card: #FFFFFF (branco)
- **Tipografia**:
  - Fonte: Inter/sans-serif
  - Título: 24px bold
  - Labels: 14px medium
  - Inputs: 16px regular
- **Espaçamento**:
  - Padding padrão: 24px
  - Gap entre campos: 16px
  - Border-radius: 8px

### Componentes
1. **Campo de Input**: Label, input, mensagem de erro
2. **Select**: Para histórico de dívidas
3. **Botão**: Primário para envio
4. **Card de Resultado**: Exibe status aprovado/reprovado
5. **Tabela de Logs**: Histórico de análises

## 3. Especificação Funcional

### Campos do Formulário
| Campo | Tipo | Validação |
|-------|------|-----------|
| idade | number | >= 18 |
| rendaMensal | number | > 0 |
| historicoDividas | select | "limpo" ou "negativado" |
| valorEmprestimo | number | > 0 |

### Regras de Negócio
1. **Validação de Idade**: Cliente deve ter >= 18 anos
2. **Cálculo de Parcela**: valorEmprestimo / 12
3. **Análise de Comprometimento**: parcela > 0.30 * rendaMensal = REPROVADO
4. **Histórico de Dívidas**: historicoDividas === "negativado" = REPROVADO
5. **Aprovação**: Todas as condições devem ser verdadeiras

### Resultado
- **Aprovado**: Todas as condições atendidas
- **Reprovado**: Alguma condição não atendida, com motivo

### Persistência
- Armazenar logs em LocalStorage
- Estrutura do log: { dataHora, dadosCliente, resultado }

## 4. Arquitetura - Camadas Obrigatórias

```
src/
├── app/
│   └── page.tsx              # UI (componente React)
├── components/
│   └── CreditForm.tsx        # UI (formulário)
├── services/
│   └── CreditService.ts      # Service (lógica de negócio)
├── validation/
│   └── CreditValidation.ts   # Validation (validações)
└── repositories/
    └── CreditRepository.ts   # Repository (persistência)
```

## 5. Restrições de Código

1. **IFs aninhados**: Máximo 2 níveis
2. **Linhas por função**: Máximo 10 linhas
3. **Separação de camadas**: Obrigatória
4. **Nomeação**: Funções e variáveis descritivas
5. **Comentários**: Explicar cada camada