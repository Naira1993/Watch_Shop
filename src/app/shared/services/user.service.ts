import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Cart} from '../interface';


@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private http: HttpClient) { }

    creatUser(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:3000/users', user)
    }

    getUserByEmail(email: string): Observable<User[]> {
        return this.http.get<User[]>(`http://localhost:3000/users?email=${email}`)

    }

    updateCart(id: number, cart: Cart) {
       return this.http.put(`http://localhost:3000/users/${id}`,{cart})
    }
    
}