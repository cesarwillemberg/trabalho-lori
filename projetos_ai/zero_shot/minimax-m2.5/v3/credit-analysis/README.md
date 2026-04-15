# Sistema de Análise de Crédito

Aplicação web completa desenvolvida com Next.js para análise de crédito de clientes.

## 🚀 Funcionalidades

- **Formulário de Análise**: Coleta dados do cliente (idade, renda, histórico de dívidas, valor do empréstimo)
- **Lógica de Negócio**:
  - Validação de maioridade (18+ anos)
  - Verificação se parcela não excede 30% da renda (12 parcelas)
  - Verificação de histórico de dívidas (deve estar limpo)
- **Resultado**: Exibição clara de Aprovado/Reprovado com motivos
- **Registro de Logs**: Armazenamento de todas as análises com data/hora
- **Histórico**: Visualização de todas as análises realizadas

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

```bash
# Clone ou navegue até o diretório do projeto
cd credit-analysis

# Instale as dependências
npm install
```

## ▶️ Execução

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
credit-analysis/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal (formulário)
│   │   ├── history/page.tsx      # Página de histórico
│   │   ├── layout.tsx             # Layout global
│   │   ├── globals.css           # Estilos globais
│   │   └── api/logs/route.ts     # API para logs
│   ├── components/
│   │   ├── CreditForm.tsx         # Formulário de análise
│   │   ├── ResultCard.tsx         # Card de resultado
│   │   ├── LogTable.tsx          # Tabela de histórico
│   │   └── Header.tsx             # Cabeçalho
│   └── lib/
│       ├── types.ts               # TypeScript interfaces
│       ├── creditAnalysis.ts     # Lógica de negócio
│       └── storage.ts            # Wrapper localStorage
├── logs.json                      # Arquivo de persistência (backend)
└── package.json
```

## 💻 Uso

1. **Nova Análise**: Preencha o formulário na página inicial
   - Idade (número)
   - Renda mensal (R$)
   - Histórico de dívidas (selecione)
   - Valor do empréstimo (R$)

2. **Resultado**: Clique em "Analisar Crédito"
   - Verá se foi aprovado ou reprovado
   - Motivos da reprovação (se aplicável)
   - Detalhes da análise (parcela, % da renda)

3. **Histórico**: Clique em "Histórico" no menu
   - Visualize todas as análises
   - Exclua registros individualmente
   - Limpe todo o histórico

## 🔧 APIs

A aplicação inclui uma API REST para persistência de logs:

- `GET /api/logs` - Retorna todos os logs
- `POST /api/logs` - Cria um novo log
- `DELETE /api/logs` - Limpa todos os logs

## 💾 Armazenamento

- **Frontend**: LocalStorage (persiste no navegador)
- **Backend**: Arquivo `logs.json` (persistência em arquivo)

## 🎨 Design

- Interface responsiva (mobile, tablet, desktop)
- Cores profissionais (azul, verde, vermelho)
- Feedback visual claro para aprovação/reprovação
- Animações suaves nos resultados