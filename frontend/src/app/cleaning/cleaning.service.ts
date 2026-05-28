import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CleaningRules {
  table: string;
  fill_missing?: { [col: string]: string };
  remove_duplicates?: boolean;
  fix_types?: { [col: string]: string };
}

export interface CleaningResult {
  status: string;
  rows_after_cleaning: number;
  table: string;
}

@Injectable({ providedIn: 'root' })
export class CleaningService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  clean(rules: CleaningRules): Observable<CleaningResult> {
    return this.http.post<CleaningResult>(`${this.apiUrl}/clean`, rules);
  }
}
