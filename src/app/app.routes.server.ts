import { RenderMode, ServerRoute } from '@angular/ssr';
import solutionsData from '../../public/data/solutions.json';
import casosData from '../../public/data/casos-exito.json';
import blogPostsData from '../../public/data/blog-posts.json';

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
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => blogPostsData.map((b) => ({ slug: b.id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
