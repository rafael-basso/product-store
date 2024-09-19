import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  product: Product = inject(ActivatedRoute).snapshot.data['product'];
  
  // form = new FormGroup({
  //   title: new FormControl<string>(this.product.title,
  //     { nonNullable: true, validators: Validators.required})
  // });
  
  onSubmit(product: Product) {
    this.productService.editProduct(this.product.id, product)
    .subscribe(() => {
      // alert('Produto salvo com sucesso!');
      this.matSnackBar.open('Produto editado com sucesso!', 'OK');
      
      // this.router.navigateByUrl('/').catch(error => alert('Erro: ' + error ));
      this.router.navigateByUrl('/');
    });
  }
}
