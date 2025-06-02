



interface CategoryBase {
  name: string;
}

export type CreateCategoryDto = CategoryBase;
export interface Category extends CategoryBase {
  id: number;
}
