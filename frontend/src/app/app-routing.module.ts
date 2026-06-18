import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorCreateComponent } from './components/doctor-create/doctor-create.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientCreateComponent } from './components/patient-create/patient-create.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'doctors', pathMatch: 'full' },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/create', component: DoctorCreateComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/create', component: PatientCreateComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
