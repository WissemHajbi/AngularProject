import { Component } from '@angular/core';
import { Adherent } from '../../models/adherent';
import { AdherentService } from '../../services/adherent.service';

@Component({ selector: 'app-adherent-list', templateUrl: './adherent-list.component.html' })
export class AdherentListComponent {
  adherents: Adherent[] = [];
  adherent!: Adherent;
  adherentId!: number;
  constructor(private adherentService: AdherentService) {}
  ngOnInit() { this.getAllAdherents(); }
  getAllAdherents() { this.adherentService.getAllAdherents().subscribe(data => { this.adherents = data; }); }
  chercherAdherentParId() { this.adherentService.getAdherentById(this.adherentId).subscribe(data => { this.adherent = data; this.adherents = [data]; }); }
  supprimerAdherent(id: number) { this.adherentService.deleteAdherent(id).subscribe(() => this.getAllAdherents()); }
}
