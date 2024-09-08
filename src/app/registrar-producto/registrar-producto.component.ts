import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  producto: Producto = new Producto();
  categorias: any[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerCategorias();
    console.log(this.producto);
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      data => {
        this.categorias = data.content;
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    console.log(this.producto);
    this.productoService.crearProducto(this.producto).subscribe(
      data => {
        console.log(data);
        this.irAListaProductos();
      },
      error => console.log(error)
    );
  }

  irAListaProductos() {
    this.router.navigate(['/productos']);
  }
}
