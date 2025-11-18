import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private router: Router) {}

  onLogin() {
    // Auth très simple pour le moment (pas de back)
    if (this.username === 'admin' && this.password === '1234') {
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/tables']); // ou '/tables' dans ton futur projet
    } else {
      this.error = 'Identifiants incorrects';
    }
  }
}
