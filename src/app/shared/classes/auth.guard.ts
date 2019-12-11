import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.servise';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

    isLogin: boolean;
    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
        //    return this.authService.isLogin()
        //     .then((isLoggedIn: boolean) => {
        //         if(isLoggedIn) {
        //             return true
        //         } else {
        //             this.router.navigate(['/login'])
        //             return false
        //         }
        //     })
    //   this.isLogin$ = 
      this.authService.isLogin().subscribe((res)=> {
          this.isLogin = res.login;
      })
   
        return this.isLogin
  

    }

    canActivateChild(childroute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(childroute, state)
    }
}