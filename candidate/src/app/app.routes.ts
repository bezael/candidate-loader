import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'candidates',
    loadChildren: () => import('./features/candidates/candidates.routes').then(m => m.candidatesRoutes),
  },
  {
    path: '',
    redirectTo: '/candidates',
    pathMatch: 'full',
  },
];
