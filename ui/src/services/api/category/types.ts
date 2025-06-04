



interface CategoryBase {
  name: string;
}

export type CategoryCreationDto = CategoryBase;
export interface Category extends CategoryBase {
  id: number;
}
