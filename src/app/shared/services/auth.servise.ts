import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) { }

    login() {
        return this.http.put<Boolean>('http://localhost:3000/isAuth/1', {login: true})
    }

    logout() {
        return this.http.put<Boolean>('http://localhost:3000/isAuth/1', {login: false})
    }

    isLogin(): Observable<{login: boolean, id: number}> {
        return this.http.get<{login: boolean, id: number}>('http://localhost:3000/isAuth/1')
    }
}