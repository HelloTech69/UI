import { ICategory } from "~features/interfaces";

export interface CategoryStateType {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
}
