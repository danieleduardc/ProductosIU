import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;
  searchTerm = '';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  onEdit(productoId: number) {
    this.actualizarProducto(productoId);
  }

  onDelete(productoId: number) {
    this.eliminarProducto(productoId);
  }

  obtenerProductos() {
    this.productoService.obtenerProductos(this.currentPage, this.pageSize, this.searchTerm).subscribe(
      data => {
        this.productos = data.content;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalElements;
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }


  onSearch() {
    this.currentPage = 0; // reseteamos la página
    this.obtenerProductos();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.obtenerProductos();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.obtenerProductos();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.obtenerProductos();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i);
  }

  actualizarProducto(productoId: number) {
    this.productoService.actulizarProducto(productoId, this.productos[productoId]).subscribe(
      data => {
        this.obtenerProductos();
      },
      error => console.log(error)
    );
  }

  eliminarProducto(productoId: number) {
    this.productoService.eliminarProducto(productoId).subscribe(
      data => {
        this.obtenerProductos();
      },
      error => console.log(error)
    );
  }

}