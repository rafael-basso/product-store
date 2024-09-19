import { Component, EventEmitter, input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  product = input<Product | null>(null);

  form!: FormGroup //! diz que sempre vai ter valor, ou seja, nunca vai ser null
  @Output() submitForm = new EventEmitter<Product>();

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '',
        { nonNullable: true, validators: Validators.required })
    });
  }

  onSubmit() {
    const product = this.form.value as Product;
    this.submitForm.emit(product);
  }
}
