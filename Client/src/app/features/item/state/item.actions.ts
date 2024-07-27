import { createAction, props } from '@ngrx/store';
import { Item } from '@core/models/item.model';

export const loadItems = createAction('[Item] Load Items');
export const loadItemsSuccess = createAction('[Item] Load Items Success', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Item] Load Items Failure', props<{ error: any }>());

export const addItem = createAction('[Item] Add Item', props<{ itemName: string, description: string }>());
export const addItemSuccess = createAction('[Item] Add Item Success', props<{ item: Item }>());
export const addItemFailure = createAction('[Item] Add Item Failure', props<{ error: any }>());

export const updateItem = createAction('[Item] Update Item', props<{ id: number, itemName: string, description: string }>());
export const updateItemSuccess = createAction('[Item] Update Item Success', props<{ item: Item }>());
export const updateItemFailure = createAction('[Item] Update Item Failure', props<{ error: any }>());

export const deleteItem = createAction('[Item] Delete Item', props<{ id: number }>());
export const deleteItemSuccess = createAction('[Item] Delete Item Success', props<{ id: number }>());
export const deleteItemFailure = createAction('[Item] Delete Item Failure', props<{ error: any }>());
