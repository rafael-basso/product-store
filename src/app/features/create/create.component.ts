import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService);
  matSnackBAr = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('',
      { nonNullable: true, validators: Validators.required})
  });

  onSubmit() {
    this.productService.saveProduct({
      title: this.form.controls.title.value,
      description: "sem descrição"   
    })
    .subscribe(() => {
      // alert('Produto salvo com sucesso!');
      this.matSnackBAr.open('Produto salvo com sucesso!', 'OK');
      
      // this.router.navigateByUrl('/').catch(error => alert('Erro: ' + error ));
      this.router.navigateByUrl('/');
    });
  }
}