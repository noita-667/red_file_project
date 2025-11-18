import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cleaning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.css'],
})
export class CleaningComponent {
  table = 'inconnue';

  typeNettoyage = 'remplacer';
  colonne = 'prix';
  valeurParDefaut = '0';

  constructor(private route: ActivatedRoute) {
    const param = this.route.snapshot.paramMap.get('table');
    if (param) {
      this.table = param;
    }
  }

  appliquer() {
    alert(
      `Nettoyage appliqué sur ${this.table} :\n` +
      `Type = ${this.typeNettoyage}\n` +
      `Colonne = ${this.colonne}\n` +
      `Valeur par défaut = ${this.valeurParDefaut}`
    );
  }
}
