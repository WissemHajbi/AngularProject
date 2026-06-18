import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Doctor } from "../models/doctor";

// A service contains methods that call the backend API.
// HttpClient is Angular's tool for sending GET, POST, PUT, DELETE requests.
@Injectable({ providedIn: "root" })
export class DoctorService {
  private apiUrl = "http://localhost:8080/api/doctors";
  constructor(private http: HttpClient) {}
  getAllDoctors() {
    return this.http.get<Doctor[]>(this.apiUrl);
  }
  getAvailableDoctors() {
    return this.http.get<Doctor[]>(this.apiUrl + "/available");
  }
  getDoctorById(id: number) {
    return this.http.get<Doctor>(this.apiUrl + "/" + id);
  }
  addDoctor(d: Doctor) {
    return this.http.post(this.apiUrl, d);
  }
  updateDoctor(id: number, d: Doctor) {
    return this.http.put(this.apiUrl + "/" + id, d);
  }
  deleteDoctor(id: number) {
    return this.http.delete(this.apiUrl + "/" + id);
  }
}
