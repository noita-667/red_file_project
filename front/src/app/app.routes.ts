import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TablesComponent } from './tables/tables.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CleaningComponent } from './cleaning/cleaning.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'analyze/:table', component: AnalyzeComponent },
  { path: 'clean/:table', component: CleaningComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

