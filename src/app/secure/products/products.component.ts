import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private readonly productService: ProductService) {
    this.nextPage();
   }

  ngOnInit(): void {}

  nextPage() {
    this.products$ = this.productService.nextPage();
  }

  prevPage() {
    this.products$ = this.productService.prevPage();
  }

  handleDelete(id: number) {
    this.productService.delete(id).subscribe(_ => this.nextPage());
  }

}
