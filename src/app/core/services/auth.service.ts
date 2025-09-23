import { Injectable, signal } from '@angular/core';
import { AuthResponse } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<{ email: string; username: string } | null>(null);

  constructor(private supabaseService: SupabaseService) {}

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabaseService.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }

  logout(): void {
    this.supabaseService.supabase.auth.signOut();
  }

  async isLoggedIn(): Promise<boolean> {
    const res = await this.supabaseService.supabase.auth.getUser();
    return !!res.data.user;
  }
}
