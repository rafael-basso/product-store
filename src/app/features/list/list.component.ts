// import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService} from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButton],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = []; // products: any[] = [];
  productsService = inject(ProductsService) //era o: httpClient = inject(HttpClient);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
        this.products = products;        
    });
  }
}