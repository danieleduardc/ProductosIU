import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = 'http://localhost:8081/api/v1/productos/';

  constructor(private httpClient: HttpClient) { }

  obtenerProductos(page: number = 0, size: number = 10, searchTerm: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchTerm) {
      // Primero intenta buscar por categoría
      return this.buscarPorCategoria(params, searchTerm).pipe(
        switchMap(result => {
          // Si no hay resultados por categoría, busca por nombre
          if (result.content.length === 0) {
            return this.buscarPorNombre(params, searchTerm);
          }
          return of(result);
        })
      );
    } else {
      // Si no hay término de búsqueda, obtén todos los productos
      return this.httpClient.get<any>(`${this.baseUrl}page`, { params });
    }
  }

  private buscarPorCategoria(params: HttpParams, searchTerm: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}page`, { 
      params: params.set('categoria', searchTerm)
    });
  }

  private buscarPorNombre(params: HttpParams, searchTerm: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}page`, { 
      params: params.set('nombre', searchTerm)
    });
  }
}