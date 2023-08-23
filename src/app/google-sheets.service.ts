 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  //private baseUrl = 'http://localhost:3000';
  private baseUrl = 'https://app-formu-maf.vercel.app'; // La URL del servidor Node.js

  constructor(private http: HttpClient) {}

  // Esta función realiza una solicitud GET al servidor para obtener datos desde Google Sheets
  getDataFromGoogleSheets(): Observable<any[]> {
    const url = `${this.baseUrl}/get-data`; 
    return this.http.get<any[]>(url); // Retorna un Observable con los datos obtenidos
  }

  getDataFromGoogleSheetsCopia(): Observable<any[]> {
    const url = `${this.baseUrl}/get-datas`; 
    return this.http.get<any[]>(url); // Retorna un Observable con los datos obtenidos
  }

  enviarDatos(arreglo: any[]) {
    console.log(arreglo);
    const url = `${this.baseUrl}/get-data`;
    return this.http.post(url, arreglo);
  }

  enviarDatosCopia(arreglo: any[]) {
    console.log(arreglo);
    const url = `${this.baseUrl}/get-datas`;
    return this.http.post(url, arreglo);
  }
}
