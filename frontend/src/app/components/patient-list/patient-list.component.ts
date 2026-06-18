import { Component } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-patient-list', templateUrl: './patient-list.component.html' })
export class PatientListComponent {
  patients: Patient[] = [];
  patient!: Patient;
  patientId!: number;
  constructor(private patientService: PatientService, public authService: AuthService) {}
  ngOnInit() { this.getAllPatients(); }
  getAllPatients() { this.patientService.getAllPatients().subscribe(data => { this.patients = data; }); }
  getPatientById() { this.patientService.getPatientById(this.patientId).subscribe(data => { this.patient = data; this.patients = [data]; }); }
  deletePatient(id: number) { this.patientService.deletePatient(id).subscribe(() => this.getAllPatients()); }
}
