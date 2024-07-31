import { create } from 'zustand';
import { Account } from '../types/models';

interface AccountState {
  accounts: Account[];

  setAccounts: (accounts: Account[]) => void;
  createAccount: (account: Account) => void;
  updateAccount: (account: Partial<Account>) => void;
  deleteAccount: (uuid: string) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: [],

  setAccounts: (accounts) => set({ accounts }),

  createAccount: (account) => {
    set((state) => ({
      accounts: [...state.accounts, account]
    }));
  },

  updateAccount: (account) => {
    set((state) => {
      const accounts = state.accounts;
      const updated = accounts.map((acc) => {
        if (acc.uuid == account.uuid) {
          acc = { ...acc, ...account };
        }
        return acc;
      });

      return {
        accounts: updated
      }
    });
  },

  deleteAccount: (uuid) => {
    set((state) => {
      const accounts = state.accounts;
      const updated = accounts.filter((acc) => (acc.uuid != uuid))

      return {
        accounts: updated
      }
    });
  },
}));
