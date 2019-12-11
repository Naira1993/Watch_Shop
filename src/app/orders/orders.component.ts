import { Component, OnInit } from '@angular/core';
import { User, Order } from '../shared/interface';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user: User;

  orders: Order[] = [];



  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'))[0];
    console.log(this.user);
    this.orderService.getOrders(this.user.email)
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      })
  }

  delete(id: number, index: number) {
    this.orderService.clear(id)
      .subscribe(()=>{
        this.orders.splice(index, 1)
      })
  }
}
