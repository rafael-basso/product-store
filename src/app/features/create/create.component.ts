import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  // form = new FormGroup({
  //   title: new FormControl<string>('',
  //     { nonNullable: true, validators: Validators.required})
  // });

  onSubmit(product: Product) {
    this.productService.saveProduct(product)
    .subscribe(() => {
      // alert('Produto salvo com sucesso!');
      this.matSnackBar.open('Produto criado com sucesso!', 'OK');
      
      // this.router.navigateByUrl('/').catch(error => alert('Erro: ' + error ));
      this.router.navigateByUrl('/');
    });
  }
}