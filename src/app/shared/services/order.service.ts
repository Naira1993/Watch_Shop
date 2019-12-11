import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Order } from '../interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    creatOrder(orders: Order): Observable<Order> {
        return this.http.post<Order>('http://localhost:3000/orders', orders)
    }

    getOrders(email: string): Observable<Order[]> {
        return this.http.get<Order[]>(`http://localhost:3000/orders?userEmail=${email}`)
    }

    clear(id: number) {
        return this.http.delete(`http://localhost:3000/orders/${id}`)
    }

}