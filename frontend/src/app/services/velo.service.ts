import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Velo } from '../models/velo';

// A service contains methods that call the backend API.
// HttpClient is Angular's tool for sending HTTP requests (GET, POST, PUT, DELETE).
@Injectable({ providedIn: 'root' })
export class VeloService {
  private apiUrl = 'http://localhost:8080/api/velos';
  constructor(private http: HttpClient) {}
  chercherTousLesVelos() { return this.http.get<Velo[]>(this.apiUrl); }
  chercherVelosDisponibles() { return this.http.get<Velo[]>(this.apiUrl + '/disponibles'); }
  chercherVeloParId(veloId: number) { return this.http.get<Velo>(this.apiUrl + '/' + veloId); }
  ajouterVelo(v: Velo) { return this.http.post(this.apiUrl, v); }
  updateVelo(id: number, v: Velo) { return this.http.put(this.apiUrl + '/' + id, v); }
  deleteVelo(id: number) { return this.http.delete(this.apiUrl + '/' + id); }
}
