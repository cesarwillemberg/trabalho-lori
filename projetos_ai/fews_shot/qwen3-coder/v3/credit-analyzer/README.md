# Sistema de Análise de Crédito

Aplicação web completa para análise de crédito de clientes, desenvolvida com Next.js.

## Tecnologias

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **LocalStorage** - Persistência de logs

## Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14+)
│   ├── page.tsx           # Página principal
│   ├── layout.tsx        # Layout raiz
│   └── globals.css       # Estilos globais
├── components/            # Componentes React
│   ├── CreditForm.tsx    # Formulário de análise
│   ├── CreditLogs.tsx    # Visualização de logs
│   └── index.ts          # Exportações
├── types/                # Definições de tipos TypeScript
│   └── index.ts
├── validation/           # Validação de entrada
│   └── creditValidation.ts
├── services/             # Regras de negócio
│   └── creditService.ts
├── repository/           # Persistência de dados
│   └── creditLogRepository.ts
└── utils/                # Funções utilitárias
    ├── idGenerator.ts
    └── formatters.ts
```

## Regras de Negócio

O crédito é aprovado apenas se **todas** as condições forem atendidas:

1. **Idade**: Cliente deve ter 18 anos ou mais
2. **Parcela**: O valor da parcela mensal (12x) não pode exceder 30% da renda mensal
3. **Histórico**: Cliente deve ter histórico de dívidas "limpo" (sem restrições)

## Como Executar

### 1. Instalar dependências

```bash
cd credit-analyzer
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 3. Acessar a aplicação

Abra o navegador em: [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila a aplicação para produção |
| `npm run start` | Inicia a aplicação em produção |
| `npm run lint` | Executa o linter |

## Funcionalidades

### Formulário de Análise
- Campo para idade do cliente
- Campo para renda mensal
- Campo para histórico de dívidas (limpo/negativado)
- Campo para valor do empréstimo solicitado
- Validação de todos os campos obrigatórios
- Exibição detalhada do resultado da análise

### Sistema de Logs
- Registra automaticamente cada análise realizada
- Armazena: data/hora, dados do cliente, resultado
- Visualização em formato de tabela
- Opção de limpar todos os logs
- Persistência via LocalStorage

## Exemplo de Uso

1. Preencha o formulário com:
   - Idade: 25
   - Renda Mensal: R$ 3.000,00
   - Histórico: Limpo
   - Valor do Empréstimo: R$ 12.000,00

2. Clique em "Analisar Crédito"

3. O sistema exibirá:
   - Resultado: Aprovado
   - Detalhamento das verificações

## Persistência

Os logs são armazenados no LocalStorage do navegador com a chave `credit_analysis_logs`. Para limpar os logs, clique no botão "Limpar Logs" na tela de logs.
