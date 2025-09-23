import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.html',
})
export class NotFound {
  constructor(private router: Router) {}

  redirect(): void {
    this.router.navigate(['/']);
  }
}
