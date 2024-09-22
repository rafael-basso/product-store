// import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, Signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';

// aqui tinha o componente do confirmar dialog

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButton, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  // products = signal<Product[]>(
  //   [inject(ActivatedRoute).snapshot.data['products']]
  // ); //descomentar se usar signal
  products: Product[] = [];

  productsService = inject(ProductsService) //era httpClient = inject(HttpClient);
  router = inject(Router);
  // matDialog = inject(MatDialog);
  confirmationDialog = inject(ConfirmationDialogService);

  ngOnInit() { //comentar se usar signal
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/editar-produto', product.id]);
  }

  onDelete(product: Product) {
    //chamar serviço de confirmation-dialog (Dialog material)
    this.confirmationDialog.openDialog()
    .pipe(filter((response) => response === true))
    .subscribe(() => {
      this.productsService.deleteProduct(product.id).subscribe(() => {
        // console.log(`produto ${product.title} deletado`);
        this.productsService.getAll().subscribe((products) => { //ATUALIZAR LISTA
          this.products = products;
          // this.products.set(products); //usado com signal
        });
      });
    });
  }
}