# Sistema de Análise de Crédito

Aplicação web em Next.js para avaliação de aprovação de crédito com regras de negócio bem definidas.

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página principal
│   ├── components/
│   │   ├── CreditForm.tsx  # Formulário de dados do cliente
│   │   ├── ResultDisplay.tsx  # Exibição do resultado
│   │   └── HistoryLog.tsx  # Histórico de análises
│   ├── lib/
│   │   ├── rules/
│   │   │   └── creditRules.ts  # Regras de negócio
│   │   └── storage/
│   │       └── storage.ts  # Persistência (LocalStorage)
│   ├── types/
│   │   └── index.ts        # Definições de tipos TypeScript
│   └── styles/
│       └── (arquivos de estilo)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Instruções de Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   Abra o navegador em `http://localhost:3000`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📋 Regras de Negócio

O sistema aprova o crédito apenas se TODAS as condições forem atendidas:

1. ✅ Cliente com 18 anos ou mais
2. ✅ Parcela não compromete mais de 30% da renda mensal
3. ✅ Histórico de dívidas "limpo" (não negativado)

### Cálculo da Parcela
- Valor fixo em 12 parcelas
- Exemplo: R$ 12.000 / 12 = R$ 1.000 por parcela

### Exemplo de Análise
- Idade: 25 anos
- Renda: R$ 3.000
- Empréstimo: R$ 12.000
- Parcela: R$ 1.000 (33,3% da renda) → **REPROVADO** (excede 30%)

## 💾 Persistência

Os logs de análise são armazenados no LocalStorage do navegador, contendo:
- Data e hora da análise
- Dados do cliente
- Resultado da avaliação
- Detalhes do cálculo

## 🎨 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **LocalStorage** - Persistência de dados
