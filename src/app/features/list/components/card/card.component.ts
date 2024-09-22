import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>();

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  
  productId = computed(() =>  this.product().id);
  productTitle = computed(() =>  this.product().title);
  productDescription = computed(() =>  this.product().description);

  onEdit() {
    this.edit.emit();
  }
  
  onDelete() {
    this.delete.emit();
  }
}
