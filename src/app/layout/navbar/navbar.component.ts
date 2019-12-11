import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.servise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{



  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout()
    .subscribe(()=> {
      window.setTimeout(()=> {
        this.router.navigate(['/login'])
      }, 1000)
    })
  }
}
