import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  form: FormGroup;
  product: Product;
  previewURL: string;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly route: ActivatedRoute, private readonly productService: ProductService) {
    const id = this.route.snapshot.params.id;
    this.productService.get(id).subscribe((prod: Product) => {
      this.product = prod;
      this.patchForm();
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z0-9_ ]+$')]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21), Validators.pattern('^[a-zA-Z0-9_ ]+$')]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern('^[0-9]+$')]],
    });
  }

  get f() {
    return this.form.controls;
  }

  patchForm() {
    this.form.patchValue({
      ...this.product
    });
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

      const fv = Object.assign({}, this.form.value);

      this.productService.update(fv.id, fv)
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
