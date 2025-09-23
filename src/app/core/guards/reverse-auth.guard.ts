import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ReverseAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.auth.isLoggedIn();
    if (!isLoggedIn) return true;

    return this.router.navigate(['/']);
  }
}
