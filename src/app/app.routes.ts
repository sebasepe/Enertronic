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
    data: {
      title: 'Telemetría Industrial y Sistemas SCADA en Perú | Enertronic',
      description: 'Expertos en telemetría industrial, sistemas SCADA e IIoT en Perú. Automatización industrial y arquitectura cibersegura. ¡Optimiza tus procesos!',
      keywords: 'Telemetría industrial Perú, Sistemas SCADA e IIoT, Automatización industrial Lima, Integración de datos industriales, Arquitectura SCADA cibersegura'
    }
  },
  {
    path: 'la-empresa',
    loadComponent: () =>
      import('./features/company/company.component').then((m) => m.CompanyComponent),
    data: {
      title: 'Empresa Integradora de Automatización y Control | Enertronic',
      description: 'Especialistas en automatización, control y telemetría industrial en Perú. Ingenieros integradores autorizados SCADA para potenciar tu eficiencia.',
      keywords: 'Empresa de ingeniería integradora Perú, Especialistas en automatización y control, Integradores autorizados SCADA, Empresa de telemetría industrial, Ingenieros en automatización de procesos'
    }
  },
  {
    path: 'soluciones',
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
    path: '**',
    redirectTo: 'home',
  },
];
