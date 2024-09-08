import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from './producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8081/api/v1/productos/';

  constructor(private httpClient: HttpClient) { }

  obtenerProductos(page: number = 0, size: number = 0): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}page?page=${page}&size=${size}`);
  }
}
