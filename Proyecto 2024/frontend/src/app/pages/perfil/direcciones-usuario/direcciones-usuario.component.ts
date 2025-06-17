import { Component } from '@angular/core';

@Component({
  selector: 'app-direcciones-usuario',
  standalone: true,
  imports: [],
  templateUrl: './direcciones-usuario.component.html',
  styleUrl: './direcciones-usuario.component.css'
})
export class DireccionesUsuarioComponent {
  direcciones: string[] = [];
  nuevaDireccion: string = '';
  cargando: boolean = false;
  error: string | null = null;

  agregarDireccion() {
    if (!this.nuevaDireccion.trim()) return;

    this.direcciones.push(this.nuevaDireccion.trim());
    this.nuevaDireccion = '';
  }

  eliminarDireccion(index: number) {
    this.direcciones.splice(index, 1);
  }

}
