import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);


/* const routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'races', component: RacesComponent, canActivate: [authGuard] },
  { path: 'races/:id', component: SingleraceComponent, canActivate: [authGuard] },
  { path: 'villes', component: VillesComponent, canActivate: [authGuard] },
  { path: 'villes/ajouter', component: EditVilleComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' as const }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(), // 👈 ajout pour activer HttpClient
    { provide: VilleService, useClass: VilleService }
  ]
}).catch((err: unknown) => console.error(err)); */