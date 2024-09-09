import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  producto: Producto = new Producto();
  categorias: any[] = [];
  id: number;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerCategorias();
    this.obtenerProducto();
  }

  obtenerCategorias() {
    this.categoriaService.obtenerCategorias().subscribe(
      data => {
        this.categorias = data.content;
      },
      error => console.log(error)
    );
  }

  obtenerProducto() {
    this.productoService.obtenerProductoPorId(this.id).subscribe(
      data => {
        this.producto = data;
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    this.productoService.actualizarProducto(this.id, this.producto).subscribe(
      data => {
        this.irAListaProductos();
      },
      error => console.log(error)
    );
  }

  irAListaProductos() {
    this.router.navigate(['/productos']);
  }
}