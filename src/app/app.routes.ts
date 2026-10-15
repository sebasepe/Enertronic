import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    data: {
      title: 'Enertronic | Telemetría IIoT y SCADA en Perú',
      description: 'Expertos en telemetría industrial, sistemas SCADA e IIoT en Perú. Automatización de procesos críticos y arquitectura cibersegura. ¡Cotiza tu proyecto hoy!',
      keywords: 'Telemetría industrial Perú, Sistemas SCADA e IIoT, Automatización industrial Lima, Integración de datos industriales, Arquitectura SCADA cibersegura',
      canonical: 'https://enertronic.com.pe/',
      robots: 'index, follow'
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
      title: 'Nosotros | Enertronic: Integración SCADA y Telemetría Perú',
      description: 'Conoce a Enertronic Ingeniería S.A.C., líderes en integración SCADA, telemetría industrial y automatización en Perú desde 2012. ¡Descubre nuestra experiencia!',
      keywords: 'Empresa de ingeniería integradora Perú, Especialistas en automatización y control, Integradores autorizados SCADA, Empresa de telemetría industrial, Ingenieros en automatización de procesos, Enertronic Ingeniería',
      canonical: 'https://enertronic.com.pe/nosotros',
      robots: 'index, follow',
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
      title: 'Soluciones de Telemetría y Hardware Industrial | Enertronic',
      description: 'Proveemos soluciones de telemetría a medida para minería, SCADA para oil & gas y hardware extremo. Conectividad satelital, celular, Mesh y MQTT.',
      keywords: 'Soluciones de telemetría a medida, hardware de telemetría extrema, Telemetría satelital Starlink / Iridium, telemetría celular 4G, telemetría Radio Mesh 2.4GHz, soluciones telemetría MQTT, telemetría Ethernet'
    }
  },
  {
    path: 'soluciones/:slug',
    loadComponent: () =>
      import('./features/solutions/solution-detail/solution-detail.component').then(
        (m) => m.SolutionDetailComponent
      ),
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
      title: 'Casos de Éxito en Telemetría y SCADA Industrial | Enertronic',
      description: 'Conoce nuestros proyectos de telemetría, implementación IIoT en minería y casos de éxito SCADA industrial en Perú. Soluciones reales y comprobadas.',
      keywords: 'Proyectos de telemetría en Perú, Casos de éxito SCADA industrial, Implementación IIoT en minería, Proyectos de automatización energía y agua'
    }
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog.component').then((m) => m.BlogComponent),
    data: {
      title: 'Blog de Telemetría, SCADA y Automatización | Enertronic',
      description: 'Descubre tendencias en automatización industrial 2026, qué es la telemetría IIoT, protocolos Modbus/MQTT y ventajas de integrar SCADA con IA.',
      keywords: '¿Qué es la telemetría IIoT?, Ventajas de integrar SCADA con Inteligencia Artificial, Protocolos industriales Modbus, DNP3 y MQTT, telemetría con energía solar, Tendencias automatización industrial 2026'
    }
  },
  {
    path: 'contactos',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      title: 'Contacto y Asesoría Técnica en Telemetría | Enertronic',
      description: 'Contáctenos para cotizar sistemas SCADA en Perú. Somos proveedores de automatización en Lima y brindamos asesoría técnica en telemetría industrial.',
      keywords: 'Cotizar sistema SCADA Perú, Asesoría técnica en telemetría, Proveedores de automatización en Lima, Enertronic Perú contacto'
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
