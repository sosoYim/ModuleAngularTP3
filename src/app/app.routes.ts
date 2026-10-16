import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { ConsultActivite } from './consult-activite/consult-activite';

export const routes: Routes = [
  { path: '', component: Home },
  // TP4 4.1: /index.html 로 접근하면 루트 경로('')로 리다이렉트하여 Home 표시
  { path: 'index.html', redirectTo: '' },
  { path: 'about', component: About },
  // TP4 4.5: 파라미터 없이 접근
  { path: 'consultAct', component: ConsultActivite },
  // TP4 4.6: 파라미터 1개 (:id) - 예: /consultAct/bonjour
  { path: 'consultAct/:id', component: ConsultActivite },
  // TP4 4.9: 파라미터 2개 (:id, :id2) - 경로 세그먼트 개수마다 라우트를 따로 등록해야 함
  { path: 'consultAct/:id/:id2', component: ConsultActivite },
];
