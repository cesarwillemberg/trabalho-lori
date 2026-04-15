# Sistema de Análise de Crédito

Aplicação web completa desenvolvida com **Next.js 15** (App Router) para análise de crédito de clientes. O sistema avalia automaticamente solicitações de empréstimo com base em critérios pré-definidos e registra um histórico completo de todas as análises realizadas.

## 📋 Funcionalidades

- ✅ Formulário web para coleta de dados do cliente (idade, renda mensal, histórico de dívidas e valor do empréstimo)
- ✅ Validação automática de três critérios de aprovação:
  - **Maioridade**: cliente deve ter 18 anos ou mais
  - **Comprometimento de renda**: parcela não pode ultrapassar 30% da renda mensal
  - **Histórico de dívidas**: cliente deve estar com nome limpo (sem restrições)
- ✅ Cálculo automático de parcelas em 12x fixas
- ✅ Exibição de resultado detalhado (Aprovado/Reprovado) com motivos
- ✅ Registro de logs persistente em arquivo JSON
- ✅ Página de histórico para visualização de todas as análises realizadas
- ✅ Interface responsiva e moderna com Tailwind CSS

## 🚀 Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Node.js** (backend integrado com API Routes)
- **File System** (persistência de logs em JSON)

## 📁 Estrutura do Projeto

```
credito-analise/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analise/
│   │   │   │   └── route.ts      # API de análise de crédito
│   │   │   └── logs/
│   │   │       └── route.ts      # API de leitura de logs
│   │   ├── logs/
│   │   │   └── page.tsx          # Página de histórico de logs
│   │   ├── layout.tsx            # Layout raiz da aplicação
│   │   └── page.tsx              # Página principal com formulário
│   ├── components/
│   │   └── FormularioAnalise.tsx # Componente do formulário + resultado
│   └── lib/
│       ├── types.ts              # Definições de tipos TypeScript
│       ├── credito-validator.ts  # Lógica de negócio (validação de crédito)
│       └── log-service.ts        # Serviço de registro de logs em JSON
├── data/
│   └── logs.json                 # Arquivo de persistência de logs (gerado automaticamente)
├── README.md                     # Este arquivo
└── package.json                  # Dependências e scripts
```

## 🛠️ Regras de Negócio

### Critérios de Aprovação

O crédito é **aprovado** apenas quando **todos** os critérios abaixo são atendidos:

1. **Idade mínima**: Cliente deve ter 18 anos ou mais
2. **Limite de comprometimento**: A parcela mensal (valor do empréstimo ÷ 12) não pode comprometer mais de 30% da renda mensal do cliente
3. **Histórico de dívidas**: Cliente deve estar com histórico "limpo" (sem restrições/negativações)

### Cálculo da Parcela

```
Valor da Parcela = Valor do Empréstimo ÷ 12
Percentual Comprometido = (Valor da Parcela ÷ Renda Mensal) × 100
```

## 📦 Instalação e Execução

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm**, **yarn** ou **pnpm** (gerenciador de pacotes)

### Passo a passo

1. **Acesse o diretório do projeto**:
   ```bash
   cd credito-analise
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação no navegador**:
   ```
   http://localhost:3000
   ```

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia o servidor de produção (após build) |
| `npm run lint` | Executa o ESLint para verificação de código |

## 🌐 Endpoints da API

### `POST /api/analise`

Realiza análise de crédito e registra log.

**Corpo da requisição**:
```json
{
  "idade": 30,
  "rendaMensal": 5000,
  "historicoDividas": "limpo",
  "valorEmprestimo": 12000
}
```

**Resposta de sucesso**:
```json
{
  "aprovado": true,
  "mensagem": "Crédito aprovado! Todos os critérios de avaliação foram atendidos.",
  "valorParcela": 1000,
  "percentualComprometido": 0.2
}
```

### `GET /api/logs`

Retorna todos os logs de análises registradas.

**Resposta**:
```json
{
  "logs": [
    {
      "id": "1713123456789-abc1234",
      "dataHora": "2026-04-15T10:30:00.000Z",
      "clienteDados": { ... },
      "resultado": { ... }
    }
  ]
}
```

## 🎨 Páginas da Aplicação

### `/` - Página Principal
- Formulário para preenchimento dos dados do cliente
- Exibição do resultado da análise em tempo real
- Cards informativos sobre os critérios de avaliação

### `/logs` - Histórico de Análises
- Lista completa de todas as análises realizadas
- Detalhes de cada análise com dados do cliente e resultado
- Ordenação por data (mais recente primeiro)

## 🔧 Configurações Adicionais

### Limpar Logs

Para limpar o histórico de logs, basta deletar o arquivo `data/logs.json`. Ele será recriado automaticamente na próxima análise.

### Produção

Para deploy em produção:

```bash
npm run build
npm run start
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando Next.js e TypeScript
