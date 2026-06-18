import { Component } from '@angular/core';
import { Chart, ChartDataset, registerables } from 'chart.js';

// This line registers the basic Chart.js chart types (pie, bar, etc.).
Chart.register(...registerables);
import { VeloService } from '../../services/velo.service';
import { AdherentService } from '../../services/adherent.service';
import { TourService } from '../../services/tour.service';

@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent {
  totalVelos = 0;
  totalAdherents = 0;
  totalTours = 0;
  chartLabels1: string[] = ['Vélos empruntés', 'Vélos disponibles'];
  chartData1: ChartDataset[] = [{ data: [0, 0], label: 'Etat des vélos' }];
  chartLabels2: string[] = [];
  chartData2: ChartDataset[] = [{ data: [], label: 'Nombre d’emprunts par adhérent' }];

  constructor(private veloService: VeloService, private adherentService: AdherentService, private tourService: TourService) {}
  ngOnInit() { this.loadPieChart(); this.loadBarChart(); this.loadTotals(); }
  loadPieChart() { this.veloService.chercherTousLesVelos().subscribe(velos => { let empruntes = velos.filter(v => v.etat == 1).length; let disponibles = velos.filter(v => v.etat == 0).length; this.chartData1 = [{ data: [empruntes, disponibles], label: 'Etat des vélos' }]; }); }
  loadBarChart() { this.adherentService.getAllAdherents().subscribe(adherents => { this.chartLabels2 = adherents.map(a => a.nom); this.chartData2 = [{ data: adherents.map(a => a.nbVeloencours), label: 'Nombre d’emprunts par adhérent' }]; }); }
  loadTotals() { this.veloService.chercherTousLesVelos().subscribe(v => this.totalVelos = v.length); this.adherentService.getAllAdherents().subscribe(a => this.totalAdherents = a.length); this.tourService.getAllTours().subscribe(t => this.totalTours = t.length); }
}
