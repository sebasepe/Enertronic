import { RenderMode, ServerRoute } from '@angular/ssr';

/** Slugs de todas las soluciones definidas en SolutionsService */
const SOLUTION_SLUGS = [
  'telemetria-celular-2g-3g-4g',
  'telemetria-satelital-iridium',
  'telemetria-satelital-starlink',
  'telemetria-radio-mesh-2-4ghz',
  'telemetria-mqtt',
  'telemetria-ethernet',
  'telemetria-wifi',
  'satelital-inmarsat-bgan-m2m',
  'telemetria-lorawan',
  'tunel-inalambrico-2-4ghz',
  'vision-remota-scada-industrial',
  'solucion-remota-maquinas-industriales',
  'telemetria-monitoreo-automotor-mineria',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'soluciones/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SOLUTION_SLUGS.map((slug) => ({ slug })),
  },
  {
    path: 'soluciones-enertronic/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SOLUTION_SLUGS.map((slug) => ({ slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
