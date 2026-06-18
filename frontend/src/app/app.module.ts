import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { NgChartsModule } from "ng2-charts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { DoctorListComponent } from "./components/doctor-list/doctor-list.component";
import { DoctorEditComponent } from "./components/doctor-edit/doctor-edit.component";
import { LoginComponent } from "./components/login/login.component";
import { DoctorCreateComponent } from "./components/doctor-create/doctor-create.component";
import { PatientListComponent } from "./components/patient-list/patient-list.component";
import { PatientCreateComponent } from "./components/patient-create/patient-create.component";
import { AppointmentListComponent } from "./components/appointment-list/appointment-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DoctorListComponent,
    DoctorCreateComponent,
    DoctorEditComponent,
    PatientListComponent,
    PatientCreateComponent,
    AppointmentListComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
