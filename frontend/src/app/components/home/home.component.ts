import { Component } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  doctors: Doctor[] = [];
  availableDoctors: Doctor[] = [];
  totalPatients = 0;
  totalAppointments = 0;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadNumbers();
  }

  loadDoctors() {
    // subscribe receives the doctors sent by the backend.
    this.doctorService.getAllDoctors().subscribe(data => {
      this.doctors = data;
    });

    this.doctorService.getAvailableDoctors().subscribe(data => {
      this.availableDoctors = data;
    });
  }

  loadNumbers() {
    this.patientService.getAllPatients().subscribe(data => {
      this.totalPatients = data.length;
    });

    this.appointmentService.getAllAppointments().subscribe(data => {
      this.totalAppointments = data.length;
    });
  }
}
