import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgChartsModule } from "ng2-charts";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, NgChartsModule, DashboardRoutingModule],
})
export class DashboardModule {}
