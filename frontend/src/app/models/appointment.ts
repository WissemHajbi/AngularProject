// A model class describes one clinic appointment.
export class Appointment {
  id!: number;
  doctorId!: number;
  patientId!: number;
  appointmentDate!: string;
  endDate!: string;
}
