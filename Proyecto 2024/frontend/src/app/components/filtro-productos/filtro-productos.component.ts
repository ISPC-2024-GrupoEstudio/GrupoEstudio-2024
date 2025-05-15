import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoriaProducto } from '../../models/categoria.interface';



@Component({
  selector: 'app-filtro-productos',
  standalone: true,
  templateUrl: './filtro-productos.component.html',
  styleUrl: './filtro-productos.component.css'
})
export class FiltroProductosComponent {
  @Input() categorias: ICategoriaProducto[] = [];

  @Output() categoriaSeleccionada = new EventEmitter<number | null>();
  @Output() textoBusqueda = new EventEmitter<string>();

  onCategoriaChange(event: Event) {
    const valor = (event.target as HTMLSelectElement).value;
    this.categoriaSeleccionada.emit(valor ? +valor : null);
  }

  onBusquedaChange(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.textoBusqueda.emit(valor.toLowerCase());
  }
}

