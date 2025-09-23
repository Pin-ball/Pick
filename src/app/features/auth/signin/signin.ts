import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './signin.html',
})
export class Signin {
  fb = inject(FormBuilder);

  constructor(private auth: AuthService, private router: Router) {}

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    const rawForm = this.form.getRawValue();

    this.auth.login(rawForm.email, rawForm.password).subscribe((result) => {
      if (result.error) {
        this.errorMessage.set(result.error.message);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
