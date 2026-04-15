# Sistema de Análise de Crédito

Aplicação web completa desenvolvida com Next.js para análise de crédito de clientes.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **LocalStorage** - Persistência de logs

## 📋 Requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

```bash
# Clone ou extraia o projeto
cd credit-analysis-app

# Instale as dependências
npm install
```

## ▶️ Execução

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### Produção
```bash
npm run build
npm start
```

## 📝 Regras de Análise

O sistema aprova o crédito apenas se **todas** as condições forem atendidas:

| Condição | Regra |
|----------|-------|
| Idade | Mínimo 18 anos |
| Parcela/Renda | Máximo 30% da renda mensal (12 parcelas) |
| Histórico | "Limpo" (sem restrições) |

## 📁 Estrutura do Projeto

```
src/
├── app/              # Páginas e rotas
│   ├── page.tsx      # Página principal
│   ├── layout.tsx    # Layout raiz
│   └── globals.css   # Estilos globais
├── components/      # Componentes React
│   ├── CreditForm.tsx    # Formulário de análise
│   ├── ResultDisplay.tsx # Exibição do resultado
│   └── LogTable.tsx      # Histórico de análises
├── lib/             # Lógica de negócio
│   ├── creditAnalysis.ts # Motor de análise
│   └── storage.ts        # Persistência LocalStorage
└── types/           # Definições TypeScript
    └── index.ts
```

## 💡 Uso

1. Preencha os campos do formulário:
   - **Idade**: idade do cliente
   - **Renda Mensal**: renda mensal em reais
   - **Histórico de Dívidas**: "limpo" ou "negativado"
   - **Valor do Empréstimo**: valor solicitado em reais

2. Clique em "Analisar Crédito"

3. O resultado será exibido com os detalhes de cada condição

4. O registro é salvo automaticamente no histórico (LocalStorage)

## 📊 Logs

Os registros de análise são armazenados no LocalStorage e podem ser visualizados na seção "Histórico de Análises" expansível, com opção de limpar.