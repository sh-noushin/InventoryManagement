import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '@app/core/models/item.model';
import { Observable} from 'rxjs';
import { ItemFacade } from '@app/features/item/state/item-facade.service';
import { ItemFormComponent } from "../../item/item-form/item-form.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [ItemFormComponent, CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements  OnInit {
  

  items$: Observable<Item[]>;
  error$: Observable<any>;
  selectedItem = signal<Item>({ id: 0, name: '', description: '' });
  showForm = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  constructor(private itemFacade: ItemFacade) {

    this.items$ = this.itemFacade.items$;
    this.error$ = this.itemFacade.error$;
  }

  ngOnInit(): void {
    this.itemFacade.loadItems();
  }


  onAdd(): void {
    this.selectedItem.set({ id: 0, name: '', description: '' });
    this.isEditMode.set(false);
    this.showForm.set(true);
  }

  onEdit(item: Item): void {
    this.selectedItem.set({ ...item });
    this.isEditMode.set(true);
    this.showForm.set(true);
  }

  onDelete(id: number): void {
    this.itemFacade.deleteItem(id);
  }

  onFormCancel(): void {
    this.showForm.set(false);
  }
}