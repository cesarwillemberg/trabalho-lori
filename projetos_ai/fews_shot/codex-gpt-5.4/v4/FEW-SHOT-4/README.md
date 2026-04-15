# Aplicação de Análise de Crédito

Aplicação web completa com Next.js para análise de crédito de clientes, organizada com separação entre interface, validação, regras de negócio, persistência e logging.

## Funcionalidades

- Formulário com idade, renda mensal, histórico de dívidas e valor do empréstimo.
- Análise de crédito com regras de negócio centralizadas.
- Validação dos dados recebidos antes do processamento.
- Cálculo da parcela em 12 meses e do percentual de comprometimento de renda.
- Aprovação apenas para clientes maiores de idade, com histórico limpo e parcela de até 30% da renda.
- Registro das análises em arquivo JSON para consulta posterior.
- Histórico exibido diretamente na interface.

## Estrutura do projeto

```text
app/
  api/credit-analysis/route.ts   # API para consultar e registrar análises
  globals.css                    # Estilos globais da aplicação
  layout.tsx                     # Layout raiz
  page.tsx                       # Página principal
components/
  CreditAnalysisForm.tsx         # Interface do formulário e histórico
data/
  analysisLogs.json              # Persistência simples em arquivo JSON
repository/
  fileRepository.ts              # Leitura e escrita do arquivo JSON
service/
  creditAnalysisService.ts       # Regras de negócio da análise
types/
  credit.ts                      # Tipos compartilhados
utils/
  calculation.ts                 # Cálculos financeiros
  logger.ts                      # Registro e consulta de logs
validation/
  creditValidation.ts            # Validações de entrada e elegibilidade
```

## Regras de negócio implementadas

1. O cliente precisa ter pelo menos 18 anos.
2. O histórico de dívidas deve estar como `limpo`.
3. O valor do empréstimo é dividido em 12 parcelas fixas.
4. A parcela não pode comprometer mais de 30% da renda mensal.
5. Cada análise gera um log com data, cliente e resultado.

## Como executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 3. Acesse no navegador

```text
http://localhost:3000
```

## Como funciona o fluxo

1. O usuário preenche o formulário.
2. O componente cliente envia os dados para `POST /api/credit-analysis`.
3. A API chama o serviço `analyzeCredit`.
4. O serviço valida entrada, calcula a parcela e decide aprovação ou reprovação.
5. O utilitário de log persiste a análise em `data/analysisLogs.json`.
6. A interface recebe o resultado atualizado e exibe também o histórico.

## Observações

- A persistência foi implementada em arquivo JSON usando o runtime Node.js da própria API do Next.js.
- Se você preferir trocar por LocalStorage depois, a separação por camadas facilita essa mudança.
- O projeto foi estruturado para facilitar manutenção e expansão futura.
