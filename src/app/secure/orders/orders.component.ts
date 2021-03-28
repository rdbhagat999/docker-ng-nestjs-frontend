import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;

  constructor(private readonly orderService: OrderService) {
    this.nextPage();
  }

  ngOnInit(): void {}

  nextPage() {
    this.orders$ = this.orderService.nextPage();
  }

  prevPage() {
    this.orders$ = this.orderService.prevPage();
  }

  handleDelete(id: number) {
    this.orderService.delete(id).subscribe(_ => this.nextPage());
  }

}
