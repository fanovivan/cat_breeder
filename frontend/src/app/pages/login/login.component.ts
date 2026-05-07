import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BreederService } from '../../services/breeder';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private breederService: BreederService,
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.result = '';
    this.breederService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.auth.setTokens(data.access, data.refresh);
        void this.router.navigate(['/cats']);
      },
      error: (err) =>
        (this.result = err.error ? JSON.stringify(err.error) : 'Ошибка входа')
    });
  }
}
