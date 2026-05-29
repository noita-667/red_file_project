import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TablesComponent } from './tables/tables.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CleaningComponent } from './cleaning/cleaning.component';
import { SummaryComponent } from './summary/summary.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'tables', component: TablesComponent, canActivate: [authGuard] },
  { path: 'analyze/:table', component: AnalyzeComponent, canActivate: [authGuard] },
  { path: 'clean/:table', component: CleaningComponent, canActivate: [authGuard] },
  { path: 'summary', component: SummaryComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
