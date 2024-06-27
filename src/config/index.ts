import Crypto from "../lib/crypto";
import { lightTheme } from "../themes";

const wrapperHorizontalPadding = 40;

const defaultIdGenerator = {
  generateId: Crypto.generateRandomUUID,
};

export const config = {
  wrapperHorizontalPadding,
  defaultIdGenerator,
};

export const transactionTypeColors = {
  "Expense": lightTheme.lightColors.error,
  "Income": lightTheme.lightColors.success,
  "Transfer": lightTheme.lightColors.warning
}

export const transactionTypeSign = {
  "Expense": "-",
  "Income": "+",
  "Transfer": "~"
}

export const baseCurrency = "FCFA";
