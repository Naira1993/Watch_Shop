import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, User } from '../interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CartService {
    constructor(private http: HttpClient) { }
    
   creatCart(cart: Cart) {
       return this.http.post<Cart>('http://localhost:3000/cart', cart)
   }

   getByTitle(email: string,title: string, model: string, price: number): Observable<Cart[]> {
       return this.http.get<Cart[]>(`http://localhost:3000/cart?email=${email}&title=${title}&model=${model}&price=${price}`)
   }

   getByEmail(email: string) {
    return this.http.get<Cart[]>(`http://localhost:3000/cart?email=${email}`)
   }

   updateCount(cart: Cart) {
    return this.http.put(`http://localhost:3000/cart/${cart.id}`, cart) 
   }

   clear(id: number) {
    return this.http.delete(`http://localhost:3000/cart/${id}`)
   }

   getById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`http://localhost:3000/cart/${id}`)
   }
}