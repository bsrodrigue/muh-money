export interface CommonTimeAttributes {
  createdAt: string;
  updatedAt: string;
};

export interface ID {
  id: number;
};

export type TransactionType = "Expense" | "Income" | "Transfer";
export type AccountType = "Cash" | "Bank" | "Mobile Money" | "Wallet";

export interface TransactionCategory {
  uuid?: string;
  title: string;
  iconName: string;
  iconFamily: string;
  color?: string;
}

export interface Transaction {
  uuid?: string;
  title: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  budgetId?: string;
  accountId?: string;
  sourceAccountId?: string;
  destinationAccountId?: string;
  date?: string;
  time?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Budget {
  uuid?: string;
  title: string;
  balance?: number;
  limitDate?: string;
  linkedAccount: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Account {
  uuid?: string;
  type: AccountType;
  title: string;
  balance?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResultPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface UserAttributes {
  agentCode?: string;
  birthDate: string;
  blocked: boolean;
  confirmationToken?: string;
  confirmed: boolean;
  email: string;
  linkedAgentCode?: string;
  name: string;
  username: string;
  balance: number;
};

export interface Article {
  id: number;
  attributes: {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
}

export type RaceTypeAttributes = {
  label: string;
  numbersToChoose: number;
  createdAt: string;
  updtatedAt: string;
}

export type RaceAttributes = {
  label: string;
  active: boolean;
  race_participants: string;
  betsStopTime: string;
  raceType?: {
    data: {
      id: number;
      attributes: RaceTypeAttributes;
    }
  }
} & CommonTimeAttributes;

export interface Race {
  id: number;
  attributes: RaceAttributes;
}

export type BetTypeAttributes = {
  label: string;
  price: number;
  numberOfHorsesToChoose: number;
} & CommonTimeAttributes;

export type BetType = {
  id: number;
} & BetTypeAttributes;

export interface Bet {
  id: number;
  attributes: {
    race: number;
    betType: number;
    amount: number;
    betContent: string;
  }
}
