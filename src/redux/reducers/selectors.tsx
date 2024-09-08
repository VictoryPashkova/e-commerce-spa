import { RootState } from './store';

export const selectCards = (state: RootState) => state.cards.cards;
export const selectComments = (state: RootState) => state.cards.comments;
export const selectColumns = (state: RootState) => state.cards.columns;
export const selectUser = (state: RootState) => state.user.userName;
export const selectUsers = (state: RootState) => state.cards.users;
export const selectModals = (state: RootState) => state.modals;
export const selectProducts = (state: RootState) => state.products.products;