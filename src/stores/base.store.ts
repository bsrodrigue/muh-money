import { create } from 'zustand';

interface BaseState<T> {
  items: T[];

  init: (items: T[]) => void;
  create: (item: T) => void;
  update: (item: Partial<T>) => void;
  remove: (uuid: string) => void;
}

export default function createBaseStore<T>() {
  return create<BaseState<T>>((set) => ({
    items: [],

    init: (items) => set({ items }),

    create: (item) => {
      set((state) => ({
        items: [...state.items, item]
      }));
    },

    update: (item) => {
      set((state) => {
        const items = state.items;
        const updated = items.map((i) => {
          if (i.uuid == item.uuid) {
            i = { ...i, ...item };
          }
          return i;
        });

        return {
          items: updated
        }
      });
    },

    remove: (uuid) => {
      set((state) => {
        const items = state.items;
        const updated = items.filter((item) => (item.uuid != uuid))

        return {
          items: updated
        }
      });
    },
  }));

}

