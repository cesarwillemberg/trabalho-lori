# Sistema de Análise de Crédito

Aplicação web completa para análise de crédito de clientes, desenvolvida com Next.js e TypeScript, seguindo padrões de arquitetura limpa (Clean Architecture).

## Funcionalidades

- **Formulário de Análise**: Interface intuitiva para inserir dados do cliente
- **Regras de Negócio**:
  - Validação de maioridade (18+ anos)
  - Verificação do comprometimento da renda (parcela máxima de 30%)
  - Análise do histórico de dívidas
  - Cálculo de parcelas fixas (12x sem juros)
- **Histórico de Análises**: Registro de todas as análises realizadas
- **Exportação**: Exportar logs em formato JSON
- **Persistência**: Armazenamento local via LocalStorage

## Arquitetura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/            # Componentes UI
│   ├── CreditForm/        # Formulário de entrada
│   ├── ResultCard/        # Card de resultado
│   └── LogTable/          # Tabela de histórico
├── domain/                # Entidades e tipos
│   └── CreditAnalysis.ts
├── services/              # Lógica de negócio
│   └── creditService.ts
├── validation/            # Validações de entrada
│   └── creditValidation.ts
├── utils/                 # Utilitários
│   └── logger.ts
└── repository/            # Persistência de dados
    └── logRepository.ts
```

## Requisitos

- Node.js 18.17 ou superior
- npm ou yarn

## Instalação

1. Clone ou copie o projeto para seu diretório local

2. Instale as dependências:

```bash
npm install
```

## Execução

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Produção

```bash
npm run build
npm start
```

## Uso

1. **Preencha o formulário** com os dados do cliente:
   - **Idade**: Idade do cliente (0-120 anos)
   - **Renda Mensal**: Valor em reais da renda mensal
   - **Histórico de Dívidas**: Selecione "Limpo" ou "Negativado"
   - **Valor do Empréstimo**: Valor total desejado

2. **Clique em "Analisar Crédito"** para processar a análise

3. **Veja o resultado**:
   - Verde com ✓ indica crédito aprovado
   - Vermelho com ✗ indica crédito reprovado, com os motivos listados

4. **Consulte o histórico** na seção inferior para ver todas as análises anteriores

5. **Exporte os dados** clicando em "Exportar" para baixar um arquivo JSON

## Regras de Análise

| Regra | Descrição | Condição |
|-------|-----------|----------|
| Maior de Idade | Cliente deve ser maior de 18 anos | `idade >= 18` |
| Parcela Máxima | Parcela não pode exceder 30% da renda | `(empréstimo / 12) <= (renda * 0.30)` |
| Histórico Limpo | Cliente não pode estar negativado | `histórico = "limpo"` |
| Parcelas Fixas | Empréstimo calculado em 12x | `parcela = valor / 12` |

## Exemplos de Uso

### Cenário 1: Aprovação
- Idade: 25 anos
- Renda: R$ 3.000,00
- Histórico: Limpo
- Empréstimo: R$ 10.000,00
- Resultado: **Aprovado** (parcela R$ 833,33 = 27,7% da renda)

### Cenário 2: Reprovação por idade
- Idade: 16 anos
- Resultado: **Reprovado** (menor de idade)

### Cenário 3: Reprovação por parcela
- Renda: R$ 2.000,00
- Empréstimo: R$ 100.000,00
- Resultado: **Reprovado** (parcela R$ 8.333,33 = 416,6% da renda)

### Cenário 4: Reprovação por restrições
- Histórico: Negativado
- Resultado: **Reprovado** (cliente negativado)

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização componentizada
- **LocalStorage** - Persistência de dados no navegador

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa o linter |

## Notas Importantes

- Os dados são armazenados apenas no LocalStorage do navegador
- Os logs são mantidos entre sessões até serem limpos manualmente
- A aplicação é responsiva e funciona em dispositivos móveis
- Não há backend - todos os dados ficam no navegador do cliente
