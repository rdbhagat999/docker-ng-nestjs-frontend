import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/models';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends AbstractService {

  endpoint = `${environment.apiURL}/api/orders`;
  private _orders$: BehaviorSubject<Order[]>;
  orders$: Observable<Order[]>;

  constructor(protected readonly http: HttpClient) {
    super(http);
    this._orders$ = new BehaviorSubject([]);
    this.orders$ = this._orders$.asObservable();
   }
}
