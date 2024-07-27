import { createReducer, on, Action } from '@ngrx/store';
import { Item } from '@core/models/item.model';
import {
  loadItems, loadItemsSuccess, loadItemsFailure,
  addItem, addItemSuccess, addItemFailure,
  updateItem, updateItemSuccess, updateItemFailure,
  deleteItem, deleteItemSuccess, deleteItemFailure
} from './item.actions';

export interface ItemState {
  items: Item[];
  error: any;
}

export const initialState: ItemState = {
  items: [],
  error: null,
};

const _itemReducer = createReducer(
  initialState,
  on(loadItems, state => ({ ...state, error: null })),
  on(loadItemsSuccess, (state, { items }) => ({ ...state, items })),
  on(loadItemsFailure, (state, { error }) => ({ ...state, error })),

  on(addItem, state => ({ ...state, error: null })),
  on(addItemSuccess, (state, { item }) => ({ ...state, items: [...state.items, item] })),
  on(addItemFailure, (state, { error }) => ({ ...state, error })),

  on(updateItem, state => ({ ...state, error: null })),
  on(updateItemSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(i => i.id === item.id ? item : i)
  })),
  on(updateItemFailure, (state, { error }) => ({ ...state, error })),

  on(deleteItem, state => ({ ...state, error: null })),
  on(deleteItemSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  })),
  on(deleteItemFailure, (state, { error }) => ({ ...state, error })),
);

export function itemReducer(state: ItemState | undefined, action: Action) {
  return _itemReducer(state, action);
}
