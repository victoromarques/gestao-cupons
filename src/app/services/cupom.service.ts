import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CupomService {
  private apiUrl = 'http://localhost:3000/cupons';

  constructor(private http: HttpClient) {}

  getCupons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCuponsByTipo(tipo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?tipo=${tipo}`);
  }

  getCupom(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  adicionarCupom(cupom: any): Observable<any> {
    return this.http.post(this.apiUrl, cupom);
  }

  atualizarCupom(id: number, cupom: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cupom);
  }

  excluirCupom(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
