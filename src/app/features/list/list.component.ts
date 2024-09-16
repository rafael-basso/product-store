// import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService} from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
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