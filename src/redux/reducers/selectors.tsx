import { RootState } from './store';

export const selectProducts = (state: RootState) => state.products.products;
export const selectCategories = (state: RootState) => state.products.categories;