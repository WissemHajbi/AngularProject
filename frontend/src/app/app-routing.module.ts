import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeloListComponent } from './components/velo-list/velo-list.component';
import { VeloCreateComponent } from './components/velo-create/velo-create.component';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';
import { AdherentCreateComponent } from './components/adherent-create/adherent-create.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'velos', pathMatch: 'full' },
  { path: 'velos', component: VeloListComponent },
  { path: 'velos/create', component: VeloCreateComponent },
  { path: 'adherents', component: AdherentListComponent },
  { path: 'adherents/create', component: AdherentCreateComponent },
  { path: 'tours', component: TourListComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
