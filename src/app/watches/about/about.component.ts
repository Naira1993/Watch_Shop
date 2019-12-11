import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Watch, Cart, User } from 'src/app/shared/interface';
import { WatchesService } from 'src/app/shared/services/watch.service';
import { AuthService } from 'src/app/shared/services/auth.servise';
import { CartService } from 'src/app/shared/services/cart.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  id: number;
  watch: Watch;
  comments = [];
  form: FormGroup;
  user: User;
  isLike: boolean;
  count = 0;
  // cLike: boolean;

  constructor(private route: ActivatedRoute,
    private watchService: WatchesService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router) { }

  async ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'))[0];
    this.form = new FormGroup({
      comment: new FormControl(null, Validators.required)
    })
    await this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
      })
    await this.watchService.getById(this.id)
      .subscribe((watch: Watch) => {
        this.count = watch.like.length;
        if (watch.like.findIndex(c => c === this.user.email) !== -1) {
          this.isLike = true;
        } else {
          this.isLike = false;
        }
      })
    await this.watchService.getById(this.id)
      .subscribe((watch: Watch) => {
        this.watch = watch;
        this.comments = watch.comments
      })
  }

  buy(watch: Watch) {

    const cart: Cart = {
      email: this.user.email,
      title: watch.title,
      model: watch.model,
      count: 1,
      price: watch.price
    }
    this.authService.isLogin()
      .subscribe((res) => {
        if (res.login) {
          this.cartService.getByTitle(this.user.email, cart.title, cart.model, cart.price)
            .subscribe((carts: Cart[]) => {
              if (carts.length) {
                const cart: Cart = {
                  email: this.user.email,
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

   onSubmit() {
      this.authService.isLogin()
      .subscribe((res)=> {
        if(res.login) {
          const comment = {
            email: this.user.email,
            text: this.form.value.comment,
            cLike: [],
            dLike: []
          }
          const watch: Watch = {
            like: this.watch.like,
            comments: this.watch.comments.concat(comment),
            email: this.watch.email,
            title: this.watch.title,
            model: this.watch.model,
            price: this.watch.price,
            img: this.watch.img
          }
          this.watchService.update(this.id, watch)
            .subscribe(() => {
              this.comments.push(comment)
              console.log(comment);
      
            })
        } else {
          MaterialService.toast('Please log in');
        }
      })
 
  }
  
  like(type: boolean) {
    this.authService.isLogin()
    .subscribe((res)=> {
      if(res.login) {
        this.form.disable()
        if (type) {
          this.isLike = true;
          const watch: Watch = {
            like:this.watch.like.concat(this.user.email),
            comments: this.watch.comments,
            email: this.watch.email,
            title: this.watch.title,
            model: this.watch.model,
            price: this.watch.price,
            img: this.watch.img
          }
          this.watchService.update(this.id, watch)
            .subscribe(() => {
              this.count++
    
            })
        } else {
          this.isLike = false;
          const watch: Watch = {
            like: this.watch.like.filter(c => c !== this.user.email),
            comments: this.watch.comments,
            email: this.watch.email,
            title: this.watch.title,
            model: this.watch.model,
            price: this.watch.price,
            img: this.watch.img
          }
          this.watchService.update(this.id, watch)
            .subscribe(() => {
              this.count--
            })
        }
        this.form.enable()
      } else {
        MaterialService.toast('Please log in');
      }
    })
  }
}
