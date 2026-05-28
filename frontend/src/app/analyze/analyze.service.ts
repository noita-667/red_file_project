import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnalysisResult {
  table: string;
  missing_values: { [col: string]: number };
  duplicates: number;
  datatype_anomalies: { [col: string]: any[] };
}

@Injectable({ providedIn: 'root' })
export class AnalyzeService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  analyze(table: string): Observable<AnalysisResult> {
    return this.http.get<AnalysisResult>(`${this.apiUrl}/analyze`, {
      params: { table },
    });
  }
}
