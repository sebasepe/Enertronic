import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'la-empresa',
    loadComponent: () =>
      import('./features/company/company.component').then((m) => m.CompanyComponent),
  },
  {
    path: 'soluciones',
    loadComponent: () =>
      import('./features/solutions/solutions.component').then((m) => m.SolutionsComponent),
  },
  {
    path: 'soluciones/:slug',
    loadComponent: () =>
      import('./features/solutions/solution-detail/solution-detail.component').then(
        (m) => m.SolutionDetailComponent
      ),
  },
  {
    path: 'casos-de-exito',
    loadComponent: () =>
      import('./features/casos-exito/casos-exito.component').then(
        (m) => m.CasosDeExitoComponent
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'contactos',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
