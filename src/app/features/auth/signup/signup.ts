import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule],
  templateUrl: './signup.html',
})
export class Signup {
  fb = inject(FormBuilder);

  constructor(private auth: AuthService, private router: Router) {}

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    this.auth.register(rawForm.username, rawForm.email, rawForm.password).subscribe((result) => {
      if (result.error) {
        this.errorMessage.set(result.error.message);
      } else {
        this.router.navigate(['/signin']);
      }
    });
  }
}
