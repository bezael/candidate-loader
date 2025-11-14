import { Routes } from '@angular/router';

export const candidatesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/candidates-page/candidates-page').then(m => m.CandidatesPage)
  },

];
