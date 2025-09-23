import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SupabaseService } from './core/services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  ngOnInit(): void {
    this.supabase.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.auth.currentUser.set({
          email: session?.user.email!,
          username: session?.user.identities?.at(0)?.identity_data?.['username'],
        });
      } else if (event === 'SIGNED_OUT') {
        this.auth.currentUser.set(null);
      }
    });
  }
}
