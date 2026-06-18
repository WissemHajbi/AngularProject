import { Component } from "@angular/core";
import { Chart, ChartDataset, registerables } from "chart.js";
import { DoctorService } from "../../services/doctor.service";
import { PatientService } from "../../services/patient.service";
import { AppointmentService } from "../../services/appointment.service";
Chart.register(...registerables);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  totalDoctors = 0;
  totalPatients = 0;
  totalAppointments = 0;
  chartLabels1: string[] = ["Busy Doctors", "Available Doctors"];
  chartData1: ChartDataset[] = [{ data: [0, 0], label: "Doctor Status" }];
  chartLabels2: string[] = [];
  chartData2: ChartDataset[] = [
    { data: [], label: "Current appointments by patient" },
  ];
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
  ) { }
  ngOnInit() {
    this.loadPieChart();
    this.loadBarChart();
    this.loadTotals();
  }
  loadPieChart() {
    this.doctorService.getAllDoctors().subscribe((doctors) => {
      let busy = doctors.filter((d) => d.available == 0).length;
      let available = doctors.filter((d) => d.available == 1).length;
      this.chartData1 = [{ data: [busy, available], label: "Doctor Status" }];
    });
  }
  loadBarChart() {
    this.patientService.getAllPatients().subscribe((patients) => {
      this.chartLabels2 = patients.map((p) => p.firstName);
      this.chartData2 = [
        {
          data: patients.map((p) => p.appointmentsCount),
          label: "Current appointments by patient",
        },
      ];
    });
  }
  loadTotals() {
    this.doctorService
      .getAllDoctors()
      .subscribe((d) => (this.totalDoctors = d.length));
    this.patientService
      .getAllPatients()
      .subscribe((p) => (this.totalPatients = p.length));
    this.appointmentService
      .getAllAppointments()
      .subscribe((a) => (this.totalAppointments = a.length));
  }
}

