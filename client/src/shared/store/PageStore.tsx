import { create } from "zustand";
import { persist } from "zustand/middleware";

import { PageStateType } from "~shared/types";

export const usePageStore = create<PageStateType>()(
  persist(
    (set) => ({
      postCurrentPage: 1,
      postPageSize: 10,
      setPostCurrentPage: (newPage) => set({ postCurrentPage: newPage }),
      setPostPageSize: (newPageSize) => set({ postPageSize: newPageSize }),
    }),
    {
      name: "page-storage",
    },
  ),
);
