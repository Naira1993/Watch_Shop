import { Component, OnInit, Input } from '@angular/core';
import { Watch, User, Cart } from 'src/app/shared/interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WatchesService } from 'src/app/shared/services/watch.service';
import { AuthService } from 'src/app/shared/services/auth.servise';
import { MaterialService } from 'src/app/shared/classes/material.service';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comment;
  @Input() index;
  id: number;
  watch: Watch;
  comments = [];
  user: User;
  cLike: boolean;
  dLike: boolean
  count: number;
  dcount: number;

  constructor(private route: ActivatedRoute,
    private watchService: WatchesService,
    private authService: AuthService) { }

  async ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'))[0];
    await this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
        console.log(this.id);
      })
    console.log(this.comment);
    this.count = this.comment.cLike.length;
    this.dcount = this.comment.dLike.length;

    if (this.comment.cLike.findIndex(c => c === this.user.email) !== -1) {
      this.cLike = true;
    } else {
      this.cLike = false;
    }
    if (this.comment.dLike.findIndex(c => c === this.user.email) !== -1) {
      this.dLike = true;
    } else {
      this.dLike = false;
    }
    this.watchService.getById(this.id)
      .subscribe((watch: Watch) => {
        this.watch = watch
      })
  }




  comLike(type: boolean) {
    this.authService.isLogin()
      .subscribe((res) => {
        if (res.login) {
          if (type) {
            this.cLike = true;
            if (this.dLike) {
              this.dLike = false;
              this.dcount--
            }
            const comment = {
              email: this.comment.email,
              text: this.comment.text,
              cLike:  this.comment.cLike.concat(this.user.email) ,
              dLike: this.comment.dLike.filter(c => c !== this.user.email)
            }
            this.watch.comments[this.index] = comment;
            const watch: Watch = {
              like: this.watch.like,
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
            this.cLike = false;
            const comment = {
              email: this.comment.email,
              text: this.comment.text,
              cLike: this.comment.cLike.filter(c => c !== this.user.email),
              dLike: this.comment.dLike,
            }
            this.watch.comments[this.index] = comment;
            const watch: Watch = {
              like: this.watch.like,
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
        } else {
          MaterialService.toast('Please log in');
        }
      })

  }

  disLike(type: boolean) {
    this.authService.isLogin()
      .subscribe((res) => {
        if (res.login) {
          if (type) {
            this.dLike = true;
            if (this.cLike) {
              this.cLike = false;
              this.count--
            }
            const comment = {
              email: this.comment.email,
              text: this.comment.text,
              cLike: this.comment.cLike.filter(c => c !== this.user.email),
              dLike: this.comment.dLike.concat(this.user.email) ,
            }
            this.watch.comments[this.index] = comment;
            const watch: Watch = {
              like: this.watch.like,
              comments: this.watch.comments,
              email: this.watch.email,
              title: this.watch.title,
              model: this.watch.model,
              price: this.watch.price,
              img: this.watch.img
            }
            this.watchService.update(this.id, watch)
              .subscribe(() => {
                this.dcount++
              })
          } else {
            this.dLike = false;
            const comment = {
              email: this.comment.email,
              text: this.comment.text,
              cLike: this.comment.cLike,
              dLike: this.comment.dLike.filter(c => c !== this.user.email),
            }
            this.watch.comments[this.index] = comment;
            const watch: Watch = {
              like: this.watch.like,
              comments: this.watch.comments,
              email: this.watch.email,
              title: this.watch.title,
              model: this.watch.model,
              price: this.watch.price,
              img: this.watch.img
            }
            this.watchService.update(this.id, watch)
              .subscribe(() => {
                this.dcount--
              })
          }
        } else {
          MaterialService.toast('Please log in');
        }
      })

  }
}
