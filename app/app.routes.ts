import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { title: 'Ana Sayfa' }
  },
  {
    path: 'math-readiness',
    loadComponent: () => import('./pages/math-readiness/math-readiness.component').then(m => m.MathReadinessComponent),
    data: { title: 'Matematiğe Hazırlık' }
  },
  {
    path: 'visual-support',
    loadComponent: () => import('./pages/visual-support/visual-support.component').then(m => m.VisualSupportComponent),
    data: { title: 'Görsel Destek' }
  },
  {
    path: 'rhythmic-counting',
    loadComponent: () => import('./pages/rhythmic-counting/rhythmic-counting.component').then(m => m.RhythmicCountingComponent),
    data: { title: 'Ritmik Sayma' }
  },
  {
    path: 'measurements',
    loadComponent: () => import('./pages/measurements/measurements.component').then(m => m.MeasurementsComponent),
    data: { title: 'Ölçümler' }
  },
  {
    path: 'special-learning',
    loadComponent: () => import('./pages/special-learning/special-learning.component').then(m => m.SpecialLearningComponent),
    data: { title: 'Özel Öğrenme' }
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
