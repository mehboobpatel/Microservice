import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userName = localStorage.getItem('userName');
    if (userName) {
      return true; // User is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
  }
}
