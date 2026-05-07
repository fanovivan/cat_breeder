import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreederService } from '../../services/breeder';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
  email = '';
  result = '';

  constructor(
    private breederService: BreederService,
    private router: Router
  ) {}

  register(): void {
    this.result = '';
    this.breederService
      .register({
        username: this.username,
        password: this.password,
        email: this.email
      })
      .subscribe({
        next: () => void this.router.navigate(['/login']),
        error: (err) =>
          (this.result = err.error ? JSON.stringify(err.error) : 'Ошибка регистрации')
      });
  }
}
