import { Component, OnInit } from '@angular/core';

import { Cart, Order } from '../shared/interface';
import { OrderService } from '../shared/services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-s',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router) { }

  carts: Cart[] = [];
  priceAll = 0;

  private computePrice(carts) {
    return carts.reduce((total, cart) => {
      return total += cart.price * cart.count
    }, 0)
  }

  private toDate(date) {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date))
  }

  ngOnInit() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.cartService.getByEmail(user[0].email)
      .subscribe((carts: Cart[]) => {
        this.carts = [...carts];
        this.priceAll = this.computePrice(this.carts)
      })
  }

  order() {
    const user = JSON.parse(window.localStorage.getItem('user'));

    const order: Order = {
      userEmail: user[0].email,
      carts: this.carts,
      date: this.toDate(new Date()),
      price: this.priceAll
    }

    this.orderService.creatOrder(order)
      .subscribe((order) => {
        console.log(order);
      })

    for (let i = 1; i <= this.carts.length; i++) {
      this.cartService.clear(i)
        .subscribe(() => {
          console.log(i)
        })
      window.setTimeout(() => {
        this.router.navigate(['/orders'])
      }, 2000)

    }
  }

  delete(id: number, index: number) {
    let cart: Cart;
    this.cartService.getById(id)
      .subscribe((cartItem: Cart) => {
        cart = cartItem;
        if (cart.count === 1) {
          this.cartService.clear(id)
            .subscribe(() => {
              this.carts.splice(index, 1)
            })
        } else {
          const userItem = JSON.parse(window.localStorage.getItem('user'))[0];
          const cart: Cart = {
            email: userItem.email,
            title: cartItem.title,
            model: cartItem.model,
            price: cartItem.price,
            count: cartItem.count - 1,
            id: cartItem.id
          }
          this.cartService.updateCount(cart)
            .subscribe(() => {
              this.carts[index].count--
            })
        }
        this.priceAll -= cartItem.price
      })

  }
}
