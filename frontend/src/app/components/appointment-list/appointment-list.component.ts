import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/appointment.service';

@Component({ selector: 'app-appointment-list', templateUrl: './appointment-list.component.html' })
export class AppointmentListComponent {
  appointments: Appointment[] = [];
  patientId!: number;
  constructor(private appointmentService: AppointmentService) {}
  ngOnInit() { this.getAllAppointments(); }
  getAllAppointments() { this.appointmentService.getAllAppointments().subscribe(data => { this.appointments = data; }); }
  getAppointmentsByPatientId() { this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe(data => { this.appointments = data; }); }
  completeAppointment(id: number) { this.appointmentService.completeAppointment(id).subscribe(() => this.getAllAppointments()); }
}
