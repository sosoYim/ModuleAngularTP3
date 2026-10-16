import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },
  // TP4 4.1: /index.html 로 접근하면 루트 경로('')로 리다이렉트하여 Home 표시
  { path: 'index.html', redirectTo: '' },
  { path: 'about', component: About },
];
