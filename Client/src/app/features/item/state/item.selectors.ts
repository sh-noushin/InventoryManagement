import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ItemState } from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('items');

export const selectAllItems = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);

export const selectItemsError = createSelector(
  selectItemState,
  (state: ItemState) => state.error
);
