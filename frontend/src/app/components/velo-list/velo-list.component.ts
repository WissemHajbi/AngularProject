import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Velo } from '../../models/velo';
import { VeloService } from '../../services/velo.service';
import { TourService } from '../../services/tour.service';

@Component({ selector: 'app-velo-list', templateUrl: './velo-list.component.html' })
export class VeloListComponent {
  velos: Velo[] = [];
  velo!: Velo;
  veloId!: number;
  adherentId: number = 1;

  constructor(private veloService: VeloService, private tourService: TourService, private router: Router) {}
  ngOnInit() { this.chercherTousLesVelos(); }

  chercherTousLesVelos() {
    // subscribe receives the data returned by the backend API.
    this.veloService.chercherTousLesVelos().subscribe(data => { this.velos = data; });
  }
  chercherVeloParId() {
    this.veloService.chercherVeloParId(this.veloId).subscribe(data => { this.velo = data; this.velos = [data]; });
  }
  Tour_Velo(veloId: number, adherentId: number) {
    this.tourService.tourVelo(veloId, adherentId).subscribe(() => {
      // Router.navigate changes the page after the operation is finished.
      this.router.navigate(['/tours']);
    });
  }
  supprimerVelo(id: number) { this.veloService.deleteVelo(id).subscribe(() => this.chercherTousLesVelos()); }
}
