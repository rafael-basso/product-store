// import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service'
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter, pipe } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar produto</h2>
  <mat-dialog-content>Deletar este produto?</mat-dialog-content>
  <mat-dialog-actions align="end">
    <!-- <button mat-button mat-dialog-close>Não</button> -->
    <button mat-button (click)="onNo()">Não</button>
    <!-- <button mat-button mat-dialog-close cdkFocusInitial>Sim</button> -->
    <button mat-raised-button color="accent" cdkFocusInitial (click)="onYes()" >Sim</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef);

  onNo() {
    this.dialogRef.close(false);
  }

  onYes() {
    this.dialogRef.close(true);
  }
}
 

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
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/editar-produto', product.id]);
  }

  onDelete(product: Product) {
    //chamar modal confirmacao (Dialog material)
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter((response) => response === true))
    .subscribe(() => {
      this.productsService.deleteProduct(product.id).subscribe(() => {
        // console.log(`produto ${product.title} deletado`);
        //ATUALIZAR LISTA
        this.productsService.getAll().subscribe((products) => {
          this.products = products;
        });
      });
    });
  }
}