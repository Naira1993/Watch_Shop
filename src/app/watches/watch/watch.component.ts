import { Component, OnInit } from '@angular/core';
import { WatchesService } from 'src/app/shared/services/watch.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { Watch, Cart } from 'src/app/shared/interface';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.servise';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  watches$: Observable<Watch[]>;
  isLogin = false
  constructor(private watchService: WatchesService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.watches$ = this.watchService.getAll();
  }

  buy(watch: Watch) {
    const userItem = JSON.parse(window.localStorage.getItem('user'))[0];
    const cart: Cart = {
      email: userItem.email,
      title: watch.title,
      model: watch.model,
      count: 1,
      price: watch.price
    }
    this.authService.isLogin()
    .subscribe((res)=> {
       if(res.login) {
        this.cartService.getByTitle(userItem.email, cart.title, cart.model, cart.price)
        .subscribe((carts: Cart[]) => {
          if (carts.length) {
            const cart: Cart = {
              email: userItem.email,
              title: carts[0].title,
              model: carts[0].model,
              price: carts[0].price,
              count: carts[0].count + 1,
              id: carts[0].id
            }
            this.cartService.updateCount(cart)
              .subscribe((cart) => {
                MaterialService.toast('Watch is added the cart')
              })
          } else {
            this.cartService.creatCart(cart)
              .subscribe(() => {
                MaterialService.toast('Watch is added the cart')
              })
          }
        }
        )
       } else {
        MaterialService.toast('Please log in');
        this.router.navigate(['/login'])
       }
    })
    window.setTimeout(() => {
      this.router.navigate(['/cart'])
    }, 500)
    }

    update(id: number){
      const user = JSON.parse(window.localStorage.getItem('user'))[0];

      this.authService.isLogin()
      .subscribe((res)=> {
         if(res.login) {
           this.watchService.getById(id)
           .subscribe((watch: Watch)=> {
            if(user.email === watch.email) {
              this.router.navigate(['/watches',id])
             } else {
            MaterialService.toast("You haven't added this watch")
             }
           })
         } else {
          MaterialService.toast('Please log in');
          this.router.navigate(['/login'])
         }
      })
    }

}
