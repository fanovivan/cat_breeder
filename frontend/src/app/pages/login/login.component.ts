import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreederService } from '../../services/breeder';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  result = '';

  constructor(private breederService: BreederService) {}

  login(): void {
    this.breederService.login(this.username, this.password).subscribe({
      next: (data) => this.result = JSON.stringify(data),
      error: (err) => this.result = err.error ? JSON.stringify(err.error) : 'Login error'
    });
  }
}
