const TOTAL_INSTALLMENTS = 12;
const MAX_INCOME_COMMITMENT = 30;

function parseNumber(value, fieldName) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    throw new Error(`O campo "${fieldName}" precisa ser um número válido.`);
  }

  return parsedValue;
}

export function normalizeCreditInput(rawData) {
  const clientData = {
    idade: parseNumber(rawData.idade, "idade"),
    rendaMensal: parseNumber(rawData.rendaMensal, "renda mensal"),
    historicoDividas: String(rawData.historicoDividas || "").trim().toLowerCase(),
    valorEmprestimo: parseNumber(rawData.valorEmprestimo, "valor do empréstimo")
  };

  if (!clientData.historicoDividas) {
    throw new Error('O campo "histórico de dívidas" é obrigatório.');
  }

  if (clientData.rendaMensal === 0) {
    throw new Error("A renda mensal deve ser maior que zero.");
  }

  return clientData;
}

export function analyzeCredit(clientData) {
  const installmentValue = Number(
    (clientData.valorEmprestimo / TOTAL_INSTALLMENTS).toFixed(2)
  );
  const incomeCommitment = Number(
    ((installmentValue / clientData.rendaMensal) * 100).toFixed(2)
  );

  const rules = {
    isAdult: clientData.idade >= 18,
    withinIncomeLimit: incomeCommitment <= MAX_INCOME_COMMITMENT,
    hasGoodDebtHistory: clientData.historicoDividas === "limpo"
  };

  const approved = Object.values(rules).every(Boolean);

  const rejectionReasons = [];

  if (!rules.isAdult) {
    rejectionReasons.push("cliente menor de idade");
  }

  if (!rules.withinIncomeLimit) {
    rejectionReasons.push("parcela acima de 30% da renda mensal");
  }

  if (!rules.hasGoodDebtHistory) {
    rejectionReasons.push("histórico de dívidas com restrição");
  }

  return {
    approved,
    installmentValue,
    incomeCommitment,
    installments: TOTAL_INSTALLMENTS,
    rules,
    reason: approved
      ? "Cliente aprovado: atende aos critérios de idade, renda e histórico financeiro."
      : `Cliente reprovado: ${rejectionReasons.join(", ")}.`
  };
}
