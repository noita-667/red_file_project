import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SummaryService, AllAnalysisResult } from './summary.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  data: AllAnalysisResult = {};
  tables: string[] = [];
  loading = true;
  error = '';

  constructor(private router: Router, private summaryService: SummaryService) {}

  ngOnInit() {
    this.summaryService.getAllAnalyses().subscribe({
      next: (res) => {
        this.data = res;
        this.tables = Object.keys(res);
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger le résumé.';
        this.loading = false;
      },
    });
  }

  missingCount(table: string): number {
    return Object.values(this.data[table]?.missing_values || {}).reduce((a, b) => a + b, 0);
  }

  missingEntries(table: string): [string, number][] {
    return Object.entries(this.data[table]?.missing_values || {}).filter(([, v]) => v > 0) as [string, number][];
  }

  anomalyEntries(table: string): [string, any[]][] {
    return Object.entries(this.data[table]?.datatype_anomalies || {});
  }

  duplicates(table: string): number {
    return this.data[table]?.duplicates ?? 0;
  }

  nettoyer(table: string) {
    this.router.navigate(['/clean', table]);
  }

  retourTables() {
    this.router.navigate(['/tables']);
  }
}
