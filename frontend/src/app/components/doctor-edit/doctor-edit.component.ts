import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({ selector: 'app-doctor-edit', templateUrl: './doctor-edit.component.html' })
export class DoctorEditComponent {
  d: Doctor = new Doctor();
  id!: number;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(this.id).subscribe(data => { this.d = data; });
  }

  updateDoctor() {
    this.doctorService.updateDoctor(this.id, this.d).subscribe(() => this.router.navigate(['/doctors']));
  }
}
