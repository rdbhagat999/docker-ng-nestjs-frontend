import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('tableState', [
      state('show', style({
        maxHeight: '150px'
      })),
      state('hide', style({
        maxHeight: '0px'
      })),
      transition('show => hide', animate('500ms ease-in')),
      transition('hide => show', animate('300ms ease-out')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;
  selectedRow: number = 0;

  constructor(private readonly orderService: OrderService) {
    this.nextPage();
  }

  ngOnInit(): void {}

  expandRow(id: number) {
    (this.selectedRow === id) ? (this.selectedRow = 0) : (this.selectedRow = id);
  }

  itemState(id: number) {
    return (this.selectedRow === id) ? 'show' : 'hide';
  }

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
