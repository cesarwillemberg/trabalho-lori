# Aplicação de Análise de Crédito

Aplicação web completa em Next.js para avaliar solicitações de crédito, aplicar regras de negócio e registrar logs em arquivo JSON.

## Funcionalidades

- Formulário com os campos idade, renda mensal, histórico de dívidas e valor do empréstimo.
- Resultado imediato da análise com status `Aprovado` ou `Reprovado`.
- Regras de negócio separadas da interface.
- API interna em Next.js para processar a análise.
- Registro de logs com data, dados do cliente e resultado da avaliação.
- Persistência dos logs em `data/analysis-log.json`.

## Regras de aprovação

O crédito só é aprovado quando todas as condições abaixo são atendidas:

- O cliente tem 18 anos ou mais.
- A parcela fixa em 12 meses compromete no máximo 30% da renda mensal.
- O histórico de dívidas está como `limpo`.

## Estrutura do projeto

```text
app/
  api/analyze/route.js     # Endpoint que processa a análise e grava logs
  globals.css              # Estilos globais da aplicação
  layout.js                # Layout base do App Router
  page.js                  # Página principal
components/
  CreditForm.js            # Formulário de entrada
  LogsPanel.js             # Exibição dos logs persistidos
  ResultCard.js            # Exibição do resultado da análise
data/
  analysis-log.json        # Arquivo com os logs
lib/
  credit-analysis.js       # Lógica de negócio da análise
  log-service.js           # Leitura e escrita dos logs
```

## Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar em modo de desenvolvimento

```bash
npm run dev
```

### 3. Abrir no navegador

```text
http://localhost:3000
```

## Fluxo da análise

1. O usuário preenche o formulário.
2. A interface envia os dados para `POST /api/analyze`.
3. A rota normaliza os dados, executa a lógica de negócio e gera o parecer.
4. O resultado é salvo em `data/analysis-log.json`.
5. A interface mostra o parecer e a lista de logs recentes.

## Observações técnicas

- A aplicação usa App Router do Next.js.
- Os comentários no código destacam trechos menos óbvios, como a retenção dos 20 logs mais recentes.
- Se preferir, a persistência poderia ser trocada por `localStorage`, mas aqui foi adotado backend simples com arquivo JSON para manter histórico entre recargas.
