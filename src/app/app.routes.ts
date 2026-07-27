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
    path: 'productos',
    loadComponent: () =>
      import('./features/products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'soluciones',
    loadComponent: () =>
      import('./features/solutions/solutions.component').then((m) => m.SolutionsComponent),
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
