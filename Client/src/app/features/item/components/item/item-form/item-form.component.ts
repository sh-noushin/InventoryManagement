import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '@app/core/models/item.model';
import { ItemFacade } from '@app/features/item/state/item-facade.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent {

  item = input<Item>({ id: 0, name: '', description: '' });
  isEditMode = input<boolean>(false);
  formCancel = output<void>();

  constructor(private itemFacade: ItemFacade) {}

  onSubmit(): void {
    if (this.isEditMode()) {
      this.itemFacade.updateItem(this.item().id, this.item().name, this.item().description);
    } else {
      this.itemFacade.addItem(this.item().name, this.item().description);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

}
