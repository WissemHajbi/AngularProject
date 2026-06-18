import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment';

// subscribe() in components is used to receive the result when the backend responds.
@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments';
  constructor(private http: HttpClient) {}
  getAllAppointments() { return this.http.get<Appointment[]>(this.apiUrl); }
  getAppointmentsByPatientId(patientId: number) { return this.http.get<Appointment[]>(this.apiUrl + '/patient/' + patientId); }
  bookAppointment(doctorId: number, patientId: number) { return this.http.post(this.apiUrl + '/book', { doctorId: doctorId, patientId: patientId }); }
  completeAppointment(id: number) { return this.http.put(this.apiUrl + '/' + id + '/complete', {}); }
}
