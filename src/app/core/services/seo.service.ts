import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private document = inject(DOCUMENT);

  constructor() {
    // 1. Escuchar futuras navegaciones en el cliente
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getDeepestRoute(this.activatedRoute)),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data: any) => {
      this.applyRouteData(data);
    });

    // 2. Procesar ruta actual inmediatamente (vital para SSR Prerendering)
    this.processInitialRoute();
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }

  private processInitialRoute(): void {
    const deepest = this.getDeepestRoute(this.activatedRoute);
    if (deepest.snapshot?.data) {
      this.applyRouteData(deepest.snapshot.data);
    }
  }

  private applyRouteData(event: any): void {
    // Actualizar Título
    if (event['title']) {
      this.titleService.setTitle(event['title']);
      this.metaService.updateTag({ property: 'og:title', content: event['title'] });
      this.metaService.updateTag({ name: 'twitter:title', content: event['title'] });
    }
    
    // Actualizar Meta Description
    if (event['description']) {
      this.metaService.updateTag({ name: 'description', content: event['description'] });
      this.metaService.updateTag({ property: 'og:description', content: event['description'] });
      this.metaService.updateTag({ name: 'twitter:description', content: event['description'] });
    }

    // Actualizar Meta Keywords
    if (event['keywords']) {
      this.metaService.updateTag({ name: 'keywords', content: event['keywords'] });
    }

    // Actualizar Robots
    const robots = event['robots'] || 'index, follow';
    this.metaService.updateTag({ name: 'robots', content: robots });

    // Actualizar Canonical
    const cleanPath = this.router.url.split('?')[0];
    const defaultCanonical = cleanPath === '/home' || cleanPath === '/' 
      ? 'https://enertronic.com.pe/' 
      : `https://enertronic.com.pe${cleanPath}`;
    const canonicalUrl = event['canonical'] || defaultCanonical;

    this.updateCanonicalUrl(canonicalUrl);
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });

    // Actualizar Schema JSON-LD
    if (event['schema']) {
      this.updateSchemaJsonLd(event['schema']);
    } else {
      this.removeSchemaJsonLd();
    }
  }

  public updateMetaTags(data: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    canonical?: string;
    schema?: any;
  }): void {
    if (data.title) {
      this.titleService.setTitle(data.title);
      this.metaService.updateTag({ property: 'og:title', content: data.title });
      this.metaService.updateTag({ name: 'twitter:title', content: data.title });
    }
    if (data.description) {
      this.metaService.updateTag({ name: 'description', content: data.description });
      this.metaService.updateTag({ property: 'og:description', content: data.description });
      this.metaService.updateTag({ name: 'twitter:description', content: data.description });
    }
    if (data.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: data.keywords });
    }
    if (data.image) {
      this.metaService.updateTag({ property: 'og:image', content: data.image });
      this.metaService.updateTag({ name: 'twitter:image', content: data.image });
    }
    if (data.canonical) {
      this.updateCanonicalUrl(data.canonical);
      this.metaService.updateTag({ property: 'og:url', content: data.canonical });
    }
    if (data.schema) {
      this.updateSchemaJsonLd(data.schema);
    }
  }

  private updateCanonicalUrl(url: string) {
    if (!this.document) return;
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateSchemaJsonLd(schema: any) {
    if (!this.document) return;
    let script: HTMLScriptElement | null = this.document.querySelector("script[id='route-schema']");
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('id', 'route-schema');
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    const jsonStr = typeof schema === 'string' ? schema : JSON.stringify(schema);
    script.textContent = jsonStr;
    (script as any).text = jsonStr;
  }

  private removeSchemaJsonLd() {
    if (!this.document) return;
    const script = this.document.querySelector("script[id='route-schema']");
    if (script) {
      script.textContent = '{}';
      (script as any).text = '{}';
    }
  }
}
