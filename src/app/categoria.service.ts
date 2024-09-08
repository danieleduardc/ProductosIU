import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl = 'http://localhost:8081/api/v1/categorias/';

  constructor(private httpClient: HttpClient) { }

  obtenerCategorias(page: number = 0, size: number = 0): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}page?page=${page}&size=${size}`);
  }
}