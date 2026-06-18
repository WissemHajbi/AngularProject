import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tour';

// This service calls the tour/rental endpoints.
// subscribe() in components is used to receive the result when the backend responds.
@Injectable({ providedIn: 'root' })
export class TourService {
  private apiUrl = 'http://localhost:8080/api/tours';
  constructor(private http: HttpClient) {}
  getAllTours() { return this.http.get<Tour[]>(this.apiUrl); }
  getToursByIDAdherant(idAdherant: number) { return this.http.get<Tour[]>(this.apiUrl + '/adherent/' + idAdherant); }
  tourVelo(veloId: number, adherentId: number) { return this.http.post(this.apiUrl + '/faire-tour', { veloId: veloId, adherentId: adherentId }); }
  retournerTour(id: number) { return this.http.put(this.apiUrl + '/' + id + '/retourner', {}); }
}
