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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event: any) => {
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
    });
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
}

