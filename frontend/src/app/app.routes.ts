import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component.ts';
import { RegisterComponent } from './pages/register/register.component.ts';
import { CatsComponent } from './pages/cats/cats.component.ts';
import { MessagesComponent } from './pages/messages/messages.component.ts';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'messages', component: MessagesComponent },
];
