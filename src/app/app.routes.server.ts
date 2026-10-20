import { RenderMode, ServerRoute } from '@angular/ssr';
import solutionsData from '../../public/data/solutions.json';
import casosData from '../../public/data/casos-exito.json';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'soluciones/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => solutionsData.map((s) => ({ slug: s.slug })),
  },
  {
    path: 'soluciones-enertronic/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => solutionsData.map((s) => ({ slug: s.slug })),
  },
  {
    path: 'casos-de-exito/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => casosData.map((c) => ({ slug: c.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
