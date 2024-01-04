import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CategoryStateType } from "~shared/types";

export const useCategoryStore = create<CategoryStateType>()(
  persist(
    (set) => ({
      categories: [],

      setCategories: (newCategories) => set({ categories: newCategories }),
    }),
    {
      name: "category-storage",
    },
  ),
);
