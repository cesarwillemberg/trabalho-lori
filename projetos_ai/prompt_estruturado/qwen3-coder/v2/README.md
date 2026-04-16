# Sistema de Análise de Crédito

Aplicação web completa desenvolvida com Next.js para avaliação de aprovação de crédito de clientes.

## Estrutura do Projeto

```
credit-analysis-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página principal com formulário e resultados
│   │   ├── layout.tsx        # Layout raiz da aplicação
│   │   └── globals.css       # Estilos globais
│   ├── components/
│   │   ├── CreditForm.tsx    # Formulário de entrada de dados
│   │   ├── ResultDisplay.tsx # Exibição do resultado da análise
│   │   └── LogsList.tsx      # Lista de análises anteriores
│   ├── business/
│   │   └── creditAnalyzer.ts # Regras de negócio para análise de crédito
│   └── services/
│       └── storageService.ts # Serviço de persistência (localStorage)
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Regras de Negócio

1. **Validação de Idade**: Cliente deve ter 18 anos ou mais
2. **Cálculo de Parcela**: 12 parcelas fixas sobre o valor do empréstimo
3. **Comprometimento de Renda**: Parcela não pode exceder 30% da renda mensal
4. **Histórico de Dívidas**: Cliente não pode estar negativado
5. **Aprovação**: Crédito aprovado apenas se TODAS as condições forem atendidas

## Instruções de Execução

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn

### Instalação

```bash
# Clone ou navegue até o diretório do projeto
cd credit-analysis-app

# Instale as dependências
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm start
```

## Tecnologias Utilizadas

- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização componentizada
- **localStorage** - Persistência de dados no navegador

## Arquitetura

O projeto segue o padrão de separação de responsabilidades:

- **UI (components/)**: Componentes React para interface
- **Business (business/)**: Lógica de negócio e validações
- **Services (services/)**: Persistência e operações de dados

## Licença

MIT
