import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get loggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  logout(): void {
    this.auth.clear();
    void this.router.navigate(['/login']);
  }
}
