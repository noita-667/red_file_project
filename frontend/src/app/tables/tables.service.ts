import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TablesService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getTables(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tables`);
  }
}
