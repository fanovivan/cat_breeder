import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private breederService: BreederService) {}

  register(): void {
    this.breederService.register({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe({
      next: (data) => this.result = JSON.stringify(data),
      error: (err) => this.result = err.error ? JSON.stringify(err.error) : 'Register error'
    });
  }
}
