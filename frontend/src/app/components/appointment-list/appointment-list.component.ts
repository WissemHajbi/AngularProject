import { Component } from "@angular/core";
import { Appointment } from "../../models/appointment";
import { AppointmentService } from "../../services/appointment.service";
import { DoctorService } from "../../services/doctor.service";
import { PatientService } from "../../services/patient.service";
import { Doctor } from "../../models/doctor";
import { Patient } from "../../models/patient";

@Component({
  selector: "app-appointment-list",
  templateUrl: "./appointment-list.component.html",
})
export class AppointmentListComponent {
  appointments: Appointment[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  patientId!: number;
  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
  ) {}
  ngOnInit() {
    this.getAllAppointments();
    this.loadRelations();
  }
  getAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }
  getAppointmentsByPatientId() {
    this.appointmentService
      .getAppointmentsByPatientId(this.patientId)
      .subscribe((data) => {
        this.appointments = data;
      });
  }
  completeAppointment(id: number) {
    this.appointmentService
      .completeAppointment(id)
      .subscribe(() => this.getAllAppointments());
  }
  loadRelations() {
    this.doctorService
      .getAllDoctors()
      .subscribe((data) => (this.doctors = data));
    this.patientService
      .getAllPatients()
      .subscribe((data) => (this.patients = data));
  }
  getDoctorName(id: number) {
    let d = this.doctors.find((x) => x.id == id);
    return d ? "Dr. " + d.firstName + " " + d.lastName : id;
  }
  getPatientName(id: number) {
    let p = this.patients.find((x) => x.id == id);
    return p ? p.firstName + " " + p.lastName : id;
  }
}
