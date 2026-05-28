import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onLogin() {
    if (!this.isValidEmail(this.username)) {
      this.error = 'Veuillez entrer une adresse email valide.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tables']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.error = 'Email ou mot de passe incorrect.';
        } else if (err.status === 422) {
          this.error = 'Veuillez entrer une adresse email valide.';
        } else {
          this.error = 'Erreur serveur. Veuillez réessayer.';
        }
      },
    });
  }
}
