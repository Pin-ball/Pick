import { Routes } from '@angular/router';
import { Signin } from '@features/auth/signin/signin';
import { Signup } from '@features/auth/signup/signup';
import { AuthGuard } from './core/guards/auth.guard';
import { ReverseAuthGuard } from './core/guards/reverse-auth.guard';
import { Home } from './features/home/home';
import { NotFound } from './features/not-found/not-found';
import { MainLayout } from './layouts/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [{ path: '', component: Home }],
  },
  {
    path: 'signin',
    component: Signin,
    canActivate: [ReverseAuthGuard],
  },
  {
    path: 'signup',
    component: Signup,
    canActivate: [ReverseAuthGuard],
  },
  {
    path: '**',
    component: NotFound,
  },
];
