import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningService } from './cleaning.service';

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
  colonne = '';
  valeurParDefaut = '0';

  loading = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cleaningService: CleaningService
  ) {
    const param = this.route.snapshot.paramMap.get('table');
    if (param) this.table = param;
  }

  retourTables() {
    this.router.navigate(['/tables']);
  }

  appliquer() {
    const rules: any = { table: this.table };

    if (this.typeNettoyage === 'supprimer') {
      rules.remove_duplicates = true;
    } else {
      // "remplacer" et "remplir" → remplir la colonne avec la valeur par défaut
      rules.fill_value = { [this.colonne]: this.valeurParDefaut };
    }

    this.loading = true;
    this.message = '';

    this.cleaningService.clean(rules).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = `Nettoyage réussi — ${res.rows_after_cleaning} lignes après traitement.`;
        this.messageType = 'success';
      },
      error: (err) => {
        this.loading = false;
        this.message = err.error?.detail || 'Erreur lors du nettoyage.';
        this.messageType = 'error';
      },
    });
  }
}
