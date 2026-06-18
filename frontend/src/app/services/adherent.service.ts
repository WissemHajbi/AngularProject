import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adherent } from '../models/adherent';

// This service groups all API calls related to adherents.
// Components call this service instead of writing HTTP code directly.
@Injectable({ providedIn: 'root' })
export class AdherentService {
  private apiUrl = 'http://localhost:8080/api/adherents';
  constructor(private http: HttpClient) {}
  getAllAdherents() { return this.http.get<Adherent[]>(this.apiUrl); }
  getAdherentById(id: number) { return this.http.get<Adherent>(this.apiUrl + '/' + id); }
  ajouterAdherent(a: Adherent) { return this.http.post(this.apiUrl, a); }
  updateAdherent(id: number, a: Adherent) { return this.http.put(this.apiUrl + '/' + id, a); }
  deleteAdherent(id: number) { return this.http.delete(this.apiUrl + '/' + id); }
}
