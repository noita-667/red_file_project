import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyzeService, AnalysisResult } from './analyze.service';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css'],
})
export class AnalyzeComponent implements OnInit {
  table = 'inconnue';
  result: AnalysisResult | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analyzeService: AnalyzeService
  ) {
    const param = this.route.snapshot.paramMap.get('table');
    if (param) this.table = param;
  }

  ngOnInit() {
    this.analyzeService.analyze(this.table).subscribe({
      next: (data) => {
        this.result = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger l'analyse.";
        this.loading = false;
      },
    });
  }

  get missingEntries() {
    if (!this.result) return [];
    return Object.entries(this.result.missing_values).filter(([, v]) => v > 0);
  }

  get anomalyEntries() {
    if (!this.result) return [];
    return Object.entries(this.result.datatype_anomalies);
  }

  nettoyer() {
    this.router.navigate(['/clean', this.table]);
  }

  retourTables() {
    this.router.navigate(['/tables']);
  }
}
