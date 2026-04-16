# Sistema de Análise de Crédito

Sistema web completo para avaliação de crédito de clientes desenvolvido com Next.js.

## 📋 Requisitos

- Node.js 18.17 ou superior
- npm ou yarn

## 🚀 Instalação

1. **Clone ou copie o projeto para sua máquina**

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra o navegador em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
credit-analysis-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts    # API route para análise
│   │   ├── globals.css         # Estilos globais + Tailwind
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página principal
│   ├── components/
│   │   ├── CreditForm.tsx      # Formulário de entrada
│   │   └── ResultDisplay.tsx   # Exibição de resultados
│   ├── services/
│   │   ├── creditService.ts    # Lógica de negócio
│   │   └── storageService.ts    # Persistência (LocalStorage)
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript
│   └── utils/
│       └── validators.ts       # Funções de validação
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 📝 Regras de Negócio

O sistema analisa o crédito com base nas seguintes regras:

| Regra | Descrição | Condição para Aprovação |
|-------|-----------|------------------------|
| 1 | Idade mínima | Cliente com 18 anos ou mais |
| 2 | Parcela mensal | 12 parcelas fixas |
| 3 | Comprometimento de renda | Parcela ≤ 30% da renda mensal |
| 4 | Histórico de dívidas | Sem negativação (histórico "limpo") |

**O crédito é aprovado apenas se TODAS as condições forem atendidas.**

## 🎯 Funcionalidades

- **Formulário de Análise**: Coleta de dados do cliente (idade, renda, histórico, valor)
- **Análise Instantânea**: Processamento das regras de negócio em tempo real
- **Visualização de Resultados**: Exibição clara do resultado com detalhes das validações
- **Histórico de Análises**: Lista de todas as análises realizadas (salvas no LocalStorage)
- **Persistência**: Logs salvos automaticamente no LocalStorage do navegador

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila o projeto para produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o linter de código |

## 📦 Tecnologias Utilizadas

- **Next.js 14** - Framework React com SSR/SSG
- **TypeScript** - Suporte tipado para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React** - Biblioteca de construção de interfaces

## 📄 Licença

Este projeto é livre para uso educacional.
