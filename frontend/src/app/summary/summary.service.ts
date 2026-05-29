import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResult } from '../analyze/analyze.service';

export type AllAnalysisResult = { [table: string]: Omit<AnalysisResult, 'table'> };

@Injectable({ providedIn: 'root' })
export class SummaryService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAllAnalyses(): Observable<AllAnalysisResult> {
    return this.http.get<AllAnalysisResult>(`${this.apiUrl}/analyze/all`);
  }
}
