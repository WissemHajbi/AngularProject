import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Velo } from '../../models/velo';
import { VeloService } from '../../services/velo.service';

@Component({ selector: 'app-velo-create', templateUrl: './velo-create.component.html' })
export class VeloCreateComponent {
  v: Velo = new Velo();
  constructor(private veloService: VeloService, private router: Router) { this.v.etat = 0; }
  ajouterVelo() { this.veloService.ajouterVelo(this.v).subscribe(() => this.router.navigate(['/velos'])); }
}
