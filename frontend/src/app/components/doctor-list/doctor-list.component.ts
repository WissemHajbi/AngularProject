import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Doctor } from "../../models/doctor";
import { DoctorService } from "../../services/doctor.service";
import { AppointmentService } from "../../services/appointment.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-doctor-list",
  templateUrl: "./doctor-list.component.html",
})
export class DoctorListComponent {
  doctors: Doctor[] = [];
  doctor!: Doctor;
  doctorId!: number;
  patientId: number = 1;
  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private router: Router,
    public authService: AuthService,
  ) {}
  ngOnInit() {
    this.getAllDoctors();
  }
  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe((data) => {
      this.doctors = data;
    });
  }
  getDoctorById() {
    this.doctorService.getDoctorById(this.doctorId).subscribe((data) => {
      this.doctor = data;
      this.doctors = [data];
    });
  }
  bookAppointment(doctorId: number, patientId: number) {
    this.appointmentService
      .bookAppointment(doctorId, patientId)
      .subscribe(() => {
        this.router.navigate(["/appointments"]);
      });
  }
  deleteDoctor(id: number) {
    this.doctorService.deleteDoctor(id).subscribe(() => this.getAllDoctors());
  }
}
