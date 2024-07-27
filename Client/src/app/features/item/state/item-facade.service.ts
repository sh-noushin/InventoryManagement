import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '@core/models/item.model';
import * as ItemActions from './item.actions';
import * as fromItem from './item.selectors';
import { AppState } from '@app/app.state';

@Injectable({
  providedIn: 'root'
})
export class ItemFacade {
  items$: Observable<Item[]>;
  error$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.items$ = this.store.pipe(select(fromItem.selectAllItems));
    this.error$ = this.store.pipe(select(fromItem.selectItemsError));
  }

  loadItems(): void {
    this.store.dispatch(ItemActions.loadItems());
  }

  addItem(itemName: string, description: string): void {
    this.store.dispatch(ItemActions.addItem({ itemName, description }));
  }

  updateItem(id: number, itemName: string, description: string): void {
    this.store.dispatch(ItemActions.updateItem({ id, itemName, description }));
  }

  deleteItem(id: number): void {
    this.store.dispatch(ItemActions.deleteItem({ id }));
  }
}
