import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TablesService } from './tables.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables: string[] = [];
  loading = true;
  error = '';

  constructor(private router: Router, private tablesService: TablesService) {}

  ngOnInit() {
    this.tablesService.getTables().subscribe({
      next: (data) => {
        this.tables = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les tables.';
        this.loading = false;
      },
    });
  }

  voirAnalyse(table: string) {
    this.router.navigate(['/analyze', table]);
  }

  voirCleaning(table: string) {
    this.router.navigate(['/clean', table]);
  }

  voirResume() {
    this.router.navigate(['/summary']);
  }
}
