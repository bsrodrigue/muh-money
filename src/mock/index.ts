import { Budget, Transaction } from "../types/models";

export const budgets: Budget[] = [
  {
    title: "Daily Food",
    type: "Basic",
    balance: 175_000,
  },
  {
    title: "Electricity Bills",
    type: "Household",
    balance: 20_000,
  },
  {
    title: "FromSoftware future DLC releases",
    type: "Important",
    balance: 50_000,
  },
];

export const transactions: Transaction[] = [
  {
    title: "Build a budget management application",
    category: "Sofware Engineering Gig",
    type: "Income",
    amount: 175_000,
  },
  {
    title: "Elden Ring DLC",
    category: "Gaming",
    type: "Expense",
    amount: 20_000,
  },
  {
    title: "Software Architecture Books",
    category: "Self Education",
    type: "Expense",
    amount: 50_000,
  },
  {
    title: "Spotify Subscription",
    category: "Music Subscription",
    type: "Expense",
    amount: 5_000,
  },
];
