import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdherentService } from '../../services/adherent.service';

@Component({ selector: 'app-adherent-create', templateUrl: './adherent-create.component.html' })
export class AdherentCreateComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private adherentService: AdherentService, private router: Router) {
    // FormGroup groups all form inputs in one object, like the exam pattern.
    this.form = this.fb.group({ nom: [''], prenom: [''], cin: [''], email: [''], tel: [''], adresse: [''], nbVeloencours: [0] });
  }
  ajouterAdherant() {
    this.adherentService.ajouterAdherent(this.form.value).subscribe(() => {
      // Router.navigate redirects to the adherents page after saving.
      this.router.navigate(['/adherents']);
    });
  }
}
