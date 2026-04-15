# Sistema de Análise de Crédito

Aplicação web completa para análise de crédito de clientes, desenvolvida com Next.js. O sistema avalia solicitações de empréstimo com base em critérios específicos de elegibilidade e registra um log de todas as análises realizadas.

##  Instalação

```bash
npm install
```

##  Execução

### Desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:3000

### Produção
```bash
npm run build
npm run start
```

##  Regras de Negócio

| Critério | Condição |
|----------|----------|
| Idade | Mínimo 18 anos |
| Parcela | Máximo 30% da renda mensal (12x) |
| Histórico | Deve estar "limpo" |

##  Estrutura do Projeto

```
src/
├── app/               # Páginas e layout Next.js
├── components/       # Componentes React
├── repository/       # Persistência (LocalStorage)
├── service/          # Lógica de negócio
├── types/             # Definições TypeScript
├── utils/             # Funções utilitárias
└── validation/       # Validações
```

##  Stack

- Next.js 14 (App Router)
- TypeScript
- CSS Modules
- LocalStorage
