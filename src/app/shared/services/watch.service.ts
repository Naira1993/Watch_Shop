import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Watch } from '../interface';

@Injectable({providedIn: 'root'})
export class WatchesService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Watch[]> {
        return this.http.get<Watch[]>('http://localhost:3000/watches')
    }
    
    creat(watch: Watch): Observable<Watch> {
        return this.http.post<Watch>('http://localhost:3000/watches', watch)
    }  

    getById(id: number): Observable<Watch> {
        return this.http.get<Watch>(`http://localhost:3000/watches/${id}`)
       }

    update(id: number, watch: Watch) {
        return this.http.put<Watch>(`http://localhost:3000/watches/${id}`, watch)
    }

    
   clear(id: number) {
    return this.http.delete(`http://localhost:3000/watches/${id}`)
   }

}