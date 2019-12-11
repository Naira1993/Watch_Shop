import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/interface'
import { AuthService } from '../shared/services/auth.servise';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  active = true;
  form1: FormGroup;
  form2: FormGroup;
  isLogin: false;

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    MaterialService.init(document.querySelectorAll('.tabs'));

    this.form1 = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.form2 = new FormGroup({
      name: new FormControl(null, Validators.required),
      remail: new FormControl(null, [Validators.required, Validators.email]),
      rpassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

  }

  onSubmit() {
    this.userService.getUserByEmail(this.form1.value.email)
      .subscribe((user: User[]) => {
        if (user.length) {
          const userItem = user[0]
          if (userItem.password === this.form1.value.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login()
            .subscribe(()=> {
              window.setTimeout(()=> {
                this.router.navigate(['/watches'])
              },2000)        
            })
          } else {
            MaterialService.toast('Please enter rigth password!')
          }
        } else {
          MaterialService.toast("To get started, registration to the system!")
          setTimeout(() => {
            this.active = false
          }, 2000)
        }
      })
  }

  submit() {
    const userItem: User = {
      name: this.form2.value.name,
      email: this.form2.value.remail,
      password: this.form2.value.rpassword
    };
    this.userService.getUserByEmail(userItem.email)
    .subscribe((user: User[])=> {
      if(user.length) {
        MaterialService.toast('This email already busy!')
      } else {
        this.userService.creatUser(userItem)
        .subscribe(() => {
          MaterialService.toast('You are successfully registered')
          this.form2.reset();
          this.active = true
        })
      }
    })
  }
}
