import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Doctor } from "../../models/doctor";
import { DoctorService } from "../../services/doctor.service";

@Component({
  selector: "app-doctor-create",
  templateUrl: "./doctor-create.component.html",
})
export class DoctorCreateComponent {
  d: Doctor = new Doctor();
  constructor(
    private doctorService: DoctorService,
    private router: Router,
  ) {
    this.d.available = 1;
  }
  addDoctor() {
    this.doctorService
      .addDoctor(this.d)
      .subscribe(() => this.router.navigate(["/doctors"]));
  }
}
