import { Account, Transaction } from "../../types/models";

export function getRealBalanceFromAccount(account: Account, allTransactions: Transaction[]) {
  const transactions = allTransactions.filter((t) => t.accountId === account.uuid);

  const expenses = transactions.filter((t) => t.type === "Expense").map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);
  const incomes = transactions.filter((t) => t.type === "Income").map((t) => t.amount).reduce((acc, curr) => acc + curr, 0);

  let total = account.balance;

  total += incomes;
  total -= expenses;

  return [total, incomes, expenses];
}
