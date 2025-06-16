import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoArgentinoService {
  private url = 'https://correo-argentino1.p.rapidapi.com/calcularPrecio';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '803b62e838mshb358622f22ad8e2p10f250jsn6f64206459b9',
    'X-RapidAPI-Host': 'correo-argentino1.p.rapidapi.com',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  cotizarEnvio(cpOrigen: string, cpDestino: string, provinciaOrigen: string, provinciaDestino: string, peso: number): Observable<any> {
    const body = {
      cpOrigen,
      cpDestino,
      provinciaOrigen,
      provinciaDestino,
      peso: peso.toString()
    };

    console.log('Cotizando envío desde Córdoba Capital:', body);
    return this.http.post(this.url, body, { headers: this.headers });
  }

  // Método helper para obtener información de envío desde Córdoba Capital
  cotizarDesdeCordoba(cpDestino: string, provinciaDestino: string, peso: number): Observable<any> {
    const cpCordoba = '5000'; // Código postal de Córdoba Capital
    const provinciaCordoba = 'AR-X'; // Código de provincia de Córdoba
    
    return this.cotizarEnvio(cpCordoba, cpDestino, provinciaCordoba, provinciaDestino, peso);
  }

  // Método para obtener sucursales de una provincia
  obtenerSucursales(provincia: string): Observable<any> {
    const url = `https://correo-argentino1.p.rapidapi.com/obtenerSucursales?provincia=${provincia}`;
    return this.http.get(url, { headers: this.headers });
  }

  // Método para determinar la provincia basada en el código postal
  determinarProvinciaSegunCP(codigoPostal: string): string {
    const cp = parseInt(codigoPostal);
    
    if (cp >= 1000 && cp <= 1999) return 'AR-C'; // CABA
    if (cp >= 2000 && cp <= 2999) return 'AR-B'; // Buenos Aires
    if (cp >= 3000 && cp <= 3999) return 'AR-E'; // Entre Ríos
    if (cp >= 4000 && cp <= 4999) return 'AR-Y'; // Jujuy/Salta/Tucumán
    if (cp >= 5000 && cp <= 5999) return 'AR-X'; // Córdoba
    if (cp >= 6000 && cp <= 6999) return 'AR-M'; // Mendoza
    if (cp >= 7000 && cp <= 7999) return 'AR-U'; // Chubut
    if (cp >= 8000 && cp <= 8999) return 'AR-R'; // Río Negro
    if (cp >= 9000 && cp <= 9999) return 'AR-Z'; // Santa Cruz
    
    return 'AR-B'; // Default Buenos Aires
  }

  // Método para obtener el nombre de la provincia
  obtenerNombreProvincia(codigo: string): string {
    const provincias: { [key: string]: string } = {
      'AR-C': 'Ciudad Autónoma de Buenos Aires',
      'AR-B': 'Buenos Aires',
      'AR-K': 'Catamarca',
      'AR-H': 'Chaco',
      'AR-U': 'Chubut',
      'AR-X': 'Córdoba',
      'AR-W': 'Corrientes',
      'AR-E': 'Entre Ríos',
      'AR-P': 'Formosa',
      'AR-Y': 'Jujuy',
      'AR-L': 'La Pampa',
      'AR-F': 'La Rioja',
      'AR-M': 'Mendoza',
      'AR-N': 'Misiones',
      'AR-Q': 'Neuquén',
      'AR-R': 'Río Negro',
      'AR-A': 'Salta',
      'AR-J': 'San Juan',
      'AR-D': 'San Luis',
      'AR-Z': 'Santa Cruz',
      'AR-S': 'Santa Fe',
      'AR-G': 'Santiago del Estero',
      'AR-V': 'Tierra del Fuego',
      'AR-T': 'Tucumán'
    };
    
    return provincias[codigo] || 'Provincia no identificada';
  }
}