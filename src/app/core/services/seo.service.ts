import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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
      }
      
      // Actualizar Meta Description
      if (event['description']) {
        this.metaService.updateTag({ name: 'description', content: event['description'] });
      }

      // Actualizar Meta Keywords
      if (event['keywords']) {
        this.metaService.updateTag({ name: 'keywords', content: event['keywords'] });
      }
    });
  }
}
