import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/models';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService {

  endpoint = `${environment.apiURL}/api/products`;
  private _products$: BehaviorSubject<Product[]>;
  products$: Observable<Product[]>;

  constructor(protected readonly http: HttpClient) {
    super(http);
    this._products$ = new BehaviorSubject([]);
    this.products$ = this._products$.asObservable();
   }

}
