import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Productos } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  getProduct(){
    return this.http.get<Productos>("https://fakestoreapi.com/products")
    .pipe(map((resp) =>{
      return resp;
    }))
  }

}
