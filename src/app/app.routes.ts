import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    data: {
      title: 'Enertronic | Telemetría IIoT y SCADA en Perú | Enertronic Ingeniería S.A.C. - Soluciones de telemetría IIot & SCADA',
      description: 'Enertronic Ingeniería S.A.C., especialistas en telemetría IIoT y sistemas SCADA en Perú. Monitoreo remoto, telemetría satelital y automatización industrial con más de 10 años de experiencia.',
      keywords: 'Telemetría industrial Perú, Sistemas SCADA e IIoT, Automatización industrial Lima, Integración de datos industriales, Arquitectura SCADA cibersegura',
      canonical: 'https://enertronic.com.pe/',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'nosotros',
    loadComponent: () =>
      import('./features/company/company.component').then((m) => m.CompanyComponent),
    data: {
      title: 'Nosotros | Enertronic Ingeniería S.A.C. - Telemetría y SCADA | Enertronic Ingeniería S.A.C. - Soluciones de telemetría IIot & SCADA',
      description: 'Conoce a Enertronic Ingeniería, empresa peruana especializada en telemetría IIoT y sistemas SCADA con más de 10 años de experiencia en el sector industrial.',
      keywords: 'Empresa de ingeniería integradora Perú, Especialistas en automatización y control, Integradores autorizados SCADA, Empresa de telemetría industrial, Ingenieros en automatización de procesos, Enertronic Ingeniería',
      canonical: 'https://enertronic.com.pe/nosotros',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'name': 'Nosotros - Enertronic Ingeniería S.A.C.',
        'url': 'https://enertronic.com.pe/nosotros',
        'description': 'Empresa peruana integradora de sistemas tecnológicos, especializada en telemetría industrial, automatización y sistemas SCADA.',
        'mainEntity': {
          '@type': 'Organization',
          'name': 'Enertronic Ingeniería S.A.C.',
          'foundingDate': '2012',
          'url': 'https://enertronic.com.pe/',
          'logo': 'https://enertronic.com.pe/assets/favicon-icon.png',
          'sameAs': [
            'https://www.linkedin.com/in/enertronic-perú-964219444'
          ]
        }
      }
    }
  },
  {
    path: 'la-empresa',
    redirectTo: 'nosotros',
    pathMatch: 'full',
  },
  {
    path: 'soluciones-enertronic',
    loadComponent: () =>
      import('./features/solutions/solutions.component').then((m) => m.SolutionsComponent),
    data: {
      title: 'Soluciones Enertronic - Enertronic Ingeniería S.A.C. | Enertronic Ingeniería S.A.C. - Soluciones de telemetría IIot & SCADA',
      description: 'Proveemos soluciones de telemetría a medida para minería, SCADA para oil & gas y hardware extremo. Conectividad satelital, celular, Mesh y MQTT.',
      keywords: 'Soluciones de telemetría a medida, hardware de telemetría extrema, Telemetría satelital Starlink / Iridium, telemetría celular 4G, telemetría Radio Mesh 2.4GHz, soluciones telemetría MQTT, telemetría Ethernet',
      canonical: 'https://enertronic.com.pe/soluciones-enertronic',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Soluciones y Hardware de Telemetría Industrial | Enertronic',
        url: 'https://enertronic.com.pe/soluciones-enertronic',
        description: 'Catálogo de hardware de telemetría, dataloggers industriales, routers 4G/5G y sistemas SCADA de Enertronic Perú.',
        publisher: {
          '@type': 'Organization',
          name: 'Enertronic Ingeniería S.A.C.',
          logo: 'https://enertronic.com.pe/assets/favicon-icon.png'
        }
      }
    }
  },
  // Redirecciones de URLs legacy de soluciones para preservar SEO
  { path: 'soluciones/telemetria-celular-2g-3g-4g', redirectTo: '/soluciones/solucion-de-telemetria-celular-2g-3g-4g', pathMatch: 'full' },
  { path: 'soluciones/telemetria-satelital-iridium', redirectTo: '/soluciones/solucion-de-telemetria-satelital-iridium', pathMatch: 'full' },
  { path: 'soluciones/telemetria-satelital-starlink', redirectTo: '/soluciones/solucion-de-telemetria-satelital-starlink', pathMatch: 'full' },
  { path: 'soluciones/telemetria-radio-mesh-2-4ghz', redirectTo: '/soluciones/solucion-de-telemetria-radio-mesh-2-4ghz', pathMatch: 'full' },
  { path: 'soluciones/telemetria-mqtt', redirectTo: '/soluciones/solucion-de-telemetria-mqtt', pathMatch: 'full' },
  { path: 'soluciones/telemetria-ethernet', redirectTo: '/soluciones/solucion-de-telemetria-ethernet', pathMatch: 'full' },
  { path: 'soluciones/telemetria-wifi', redirectTo: '/soluciones/solucion-de-telemetria-wifi', pathMatch: 'full' },
  { path: 'soluciones/satelital-inmarsat-bgan-m2m', redirectTo: '/soluciones/solucion-de-telemetria-satelital-inmarsat-bgan-m2m', pathMatch: 'full' },
  { path: 'soluciones/telemetria-lorawan', redirectTo: '/soluciones/solucion-de-telemetria-lorawan', pathMatch: 'full' },
  { path: 'soluciones/tunel-inalambrico-2-4ghz', redirectTo: '/soluciones/solucion-de-telemetria-tunel-inalambrico-2-4ghz', pathMatch: 'full' },
  { path: 'soluciones/vision-remota-scada-industrial', redirectTo: '/soluciones/soluciones-integrales-de-telemetria-scada-y-vision-remota-industrial', pathMatch: 'full' },
  { path: 'soluciones/telemetria-monitoreo-automotor-mineria', redirectTo: '/soluciones/soluciones-telemetria-monitoreo-automotor-mineria', pathMatch: 'full' },
  {
    path: 'soluciones/:slug',
    loadComponent: () =>
      import('./features/solutions/solution-detail/solution-detail.component').then(
        (m) => m.SolutionDetailComponent
      ),
    data: {
      dynamicSeo: true,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  },
  {
    path: 'soluciones-enertronic/:slug',
    redirectTo: (route: any) => `/soluciones/${route.params['slug']}`,
  },
  {
    path: 'soluciones',
    redirectTo: 'soluciones-enertronic',
    pathMatch: 'full',
  },
  {
    path: 'servicios',
    redirectTo: 'soluciones-enertronic',
    pathMatch: 'full',
  },
  {
    path: 'casos-de-exito',
    loadComponent: () =>
      import('./features/casos-exito/casos-exito.component').then(
        (m) => m.CasosDeExitoComponent
      ),
    data: {
      title: 'Casos de Éxito - Enertronic Ingeniería S.A.C. | Enertronic Ingeniería S.A.C. - Soluciones de telemetría IIot & SCADA',
      description: 'Conoce nuestros proyectos de telemetría, implementación IIoT en minería y casos de éxito SCADA industrial en Perú. Soluciones reales y comprobadas.',
      keywords: 'Proyectos de telemetría en Perú, Casos de éxito SCADA industrial, Implementación IIoT en minería, Proyectos de automatización energía y agua',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Casos de Éxito en Telemetría y SCADA Industrial | Enertronic',
        url: 'https://enertronic.com.pe/casos-de-exito',
        description: 'Proyectos y casos de éxito de automatización, supervisión SCADA y telemetría industrial implementados en Perú.',
        publisher: {
          '@type': 'Organization',
          name: 'Enertronic Ingeniería S.A.C.',
          logo: 'https://enertronic.com.pe/assets/favicon-icon.png'
        }
      }
    }
  },
  {
    path: 'casos-de-exito/:slug',
    loadComponent: () =>
      import('./features/casos-exito/casos-exito.component').then(
        (m) => m.CasosDeExitoComponent
      ),
    data: {
      dynamicSeo: true,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog.component').then((m) => m.BlogComponent),
    data: {
      title: 'Blog - Enertronic Ingeniería S.A.C. | Enertronic Ingeniería S.A.C. - Soluciones de telemetría IIot & SCADA',
      description: 'Descubre tendencias en automatización industrial 2026, qué es la telemetría IIoT, protocolos Modbus/MQTT y ventajas de integrar SCADA con IA.',
      keywords: '¿Qué es la telemetría IIoT?, Ventajas de integrar SCADA con Inteligencia Artificial, Protocolos industriales Modbus, DNP3 y MQTT, telemetría con energía solar, Tendencias automatización industrial 2026',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog de Telemetría, SCADA y Automatización Industrial | Enertronic',
        url: 'https://enertronic.com.pe/blog',
        description: 'Publicaciones técnicas sobre automatización industrial, telemetría satelital/celular, protocolos industriales y ciberseguridad.',
        publisher: {
          '@type': 'Organization',
          name: 'Enertronic Ingeniería S.A.C.',
          logo: 'https://enertronic.com.pe/assets/favicon-icon.png'
        }
      }
    }
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./features/blog/blog.component').then((m) => m.BlogComponent),
    data: {
      dynamicSeo: true,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }
  },
  {
    path: 'contactos',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      title: 'Contacto | Enertronic Ingeniería S.A.C. - Lima, Perú | Enertronic Ingeniería S.A.C. - Soluciones de telemetría IIot & SCADA',
      description: 'Contáctanos para soluciones de telemetría IIoT y SCADA en Perú. Escríbenos o llámanos y te asesoramos en tu proyecto de monitoreo remoto industrial.',
      keywords: 'Cotizar sistema SCADA Perú, Asesoría técnica en telemetría, Proveedores de automatización en Lima, Enertronic Perú contacto',
      canonical: 'https://enertronic.com.pe/contactos',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contacto y Asesoría Técnica | Enertronic Ingeniería S.A.C.',
        url: 'https://enertronic.com.pe/contactos',
        description: 'Póngase en contacto con los ingenieros especialistas de Enertronic Perú para cotizaciones de SCADA, telemetría y automatización industrial.',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: 'Enertronic Ingeniería S.A.C.',
          telephone: '+51 941 700 464',
          email: 'ventas@enertronicperu.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Calle Buganvilias Mz. C Lte. 26',
            addressLocality: 'Ate',
            addressRegion: 'Lima',
            addressCountry: 'PE'
          },
          url: 'https://enertronic.com.pe/'
        }
      }
    }
  },
  {
    path: 'proyectos',
    redirectTo: 'casos-de-exito',
    pathMatch: 'full',
  },
  {
    path: 'contacto',
    redirectTo: 'contactos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
