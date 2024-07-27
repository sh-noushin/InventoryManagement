import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ItemService } from '@core/services/item.service';
import {
  loadItems, loadItemsSuccess, loadItemsFailure,
  addItem, addItemSuccess, addItemFailure,
  updateItem, updateItemSuccess, updateItemFailure,
  deleteItem, deleteItemSuccess, deleteItemFailure
} from './item.actions';

@Injectable()
export class ItemEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() => this.itemService.getItems().pipe(
        map(items => loadItemsSuccess({ items })),
        catchError(error => of(loadItemsFailure({ error })))
      ))
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItem),
      mergeMap(action => this.itemService.addItem(action.itemName, action.description).pipe(
        map(item => addItemSuccess({ item })),
        catchError(error => of(addItemFailure({ error })))
      ))
    )
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItem),
      mergeMap(action => this.itemService.updateItem(action.id, action.itemName, action.description).pipe(
        map(() => updateItemSuccess({ item: { id: action.id, name: action.itemName, description: action.description } })),
        catchError(error => of(updateItemFailure({ error })))
      ))
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItem),
      mergeMap(action => this.itemService.deleteItem(action.id).pipe(
        map(() => deleteItemSuccess({ id: action.id })),
        catchError(error => of(deleteItemFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}
}
