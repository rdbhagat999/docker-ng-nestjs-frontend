import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  previewURL: string;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z0-9_ ]+$')]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z0-9_ ]+$')]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern('^[0-9]+$')]],
    });
  }

  get f() {
    return this.form.controls;
  }

  handleUploadedEvent(url: string) {
    this.form.patchValue({
      image: url
    });
  }

  handleImagePreview(url: string) {
    this.previewURL = url;
  }

  handleSubmit() {

    this.form.markAllAsTouched();

    if(this.form.valid) {

      this.form.value.price = parseFloat(this.form.value.price);

      this.productService.create(this.form.value)
      .subscribe((res: Product) => {

        console.info('handleInfoSubmit_response');
        this.router.navigate(['/main/products']);

      }, (error) => {
        console.error('handleInfoSubmit_error');
      }, () => {
        console.info('handleInfoSubmit_complete');
      },);

    }

  }

}
