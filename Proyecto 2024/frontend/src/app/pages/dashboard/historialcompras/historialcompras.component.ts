import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard--estadoEnvios',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './historialcompras.component.html',
  styleUrl: './historialcompras.component.css'
})
export class HistorialComprasComponent {

    @Input() id!: String ; 
}