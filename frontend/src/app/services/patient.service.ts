import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';

// This service groups all API calls related to patients.
@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients';
  constructor(private http: HttpClient) {}
  getAllPatients() { return this.http.get<Patient[]>(this.apiUrl); }
  getPatientById(id: number) { return this.http.get<Patient>(this.apiUrl + '/' + id); }
  addPatient(p: Patient) { return this.http.post(this.apiUrl, p); }
  updatePatient(id: number, p: Patient) { return this.http.put(this.apiUrl + '/' + id, p); }
  deletePatient(id: number) { return this.http.delete(this.apiUrl + '/' + id); }
}
