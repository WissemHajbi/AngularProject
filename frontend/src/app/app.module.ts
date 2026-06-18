import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VeloListComponent } from './components/velo-list/velo-list.component';
import { VeloCreateComponent } from './components/velo-create/velo-create.component';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';
import { AdherentCreateComponent } from './components/adherent-create/adherent-create.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, VeloListComponent, VeloCreateComponent, AdherentListComponent, AdherentCreateComponent, TourListComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatCardModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
