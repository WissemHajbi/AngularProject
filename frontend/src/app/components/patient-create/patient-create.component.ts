import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({ selector: 'app-patient-create', templateUrl: './patient-create.component.html' })
export class PatientCreateComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private patientService: PatientService, private router: Router) {
    // FormGroup groups all form inputs in one object.
    this.form = this.fb.group({ firstName: [''], lastName: [''], cin: [''], email: [''], phone: [''], address: [''], appointmentsCount: [0] });
  }
  addPatient() { this.patientService.addPatient(this.form.value).subscribe(() => { this.router.navigate(['/patients']); }); }
}
