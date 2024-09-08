import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../../types';

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
        const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    addFavoriteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, isFavorite: true };
        }
        return product;
      });
    },
    removeFavoriteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, isFavorite: false };
        }
        return product;
      });
    }
  },
});

export const { setProducts, removeProduct, addFavoriteProduct, removeFavoriteProduct } = productsSlice.actions;

export default productsSlice.reducer;
