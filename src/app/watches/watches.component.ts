import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.servise';


@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.css']
})
export class WatchesComponent implements OnInit {



  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
 

  }


  add() {
    this.authService.isLogin()
    .subscribe((res)=> {
      if(res.login) {
        window.setTimeout(()=> {
          this.router.navigate(['/add'])
        }, 1000)
      } else {
        MaterialService.toast('Please log in')
      }
    })


  }
  


}
