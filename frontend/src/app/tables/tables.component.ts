import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  tables = ['clients', 'ventes', 'transactions'];

  constructor(private router: Router) {}

  voirAnalyse(table: string) {
    this.router.navigate(['/analyze', table]);
  }
}
