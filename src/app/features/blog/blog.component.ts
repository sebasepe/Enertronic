import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { LanguageService } from '../../core/services/language.service';
import { Subscription, timer, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BlogPost {
  id: string;
  image: string;
  categoryES: string;
  categoryEN: string;
  titleES: string;
  titleEN: string;
  excerptES: string;
  excerptEN: string;
  contentES: string[];
  contentEN: string[];
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  externalUrl?: string;
  sourceName?: string;
  sourceCategoryId?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  public langService = inject(LanguageService);

  private timerSubscription?: Subscription;
  public isLoadingRss = signal<boolean>(false);
  public lastUpdated = signal<Date | null>(null);

  public selectedCategory = signal<string>('ALL');
  public selectedPost = signal<BlogPost | null>(null);

  public categories = [
    { id: 'ALL', labelES: 'Todos', labelEN: 'All' },
    { id: 'HARDWARE_IOT', labelES: 'Hardware & IoT', labelEN: 'Hardware & IoT' },
    { id: 'ROUTERS_4G_5G', labelES: 'Routers & 4G/5G', labelEN: 'Routers & 4G/5G' },
    { id: 'SCADA', labelES: 'SCADA', labelEN: 'SCADA' },
  ];

  public rssPosts = signal<BlogPost[]>([]);

  public blogPosts: BlogPost[] = [];

  ngOnInit(): void {
    // Temporizador RxJS: 0 inicial (descarga al instante al entrar al blog),
    // y repetido automáticamente cada 15 minutos (900,000 ms) de forma invisible.
    this.timerSubscription = timer(0, 15 * 60 * 1000).subscribe(() => {
      this.loadRssFeeds();
    });
  }

  ngOnDestroy(): void {
    // Apaga el temporizador al salir de la sección Blog para ahorrar datos y memoria del navegador.
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public loadRssFeeds(): void {
    this.isLoadingRss.set(true);

    const hackster$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://www.hackster.io/news.atom')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    const advantech$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://icr.advantech.com/blog/rss')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    const iotAnalytics$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://iot-analytics.com/category/industrial-iot/feed/')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    const iotForAll$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://www.iotforall.com/feed')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    forkJoin([hackster$, advantech$, iotAnalytics$, iotForAll$]).subscribe({
      next: ([hacksterRes, advantechRes, iotAnalyticsRes, iotForAllRes]) => {
        const livePosts: BlogPost[] = [];

        // 1. Hackster.io (Noticias de Hardware e IoT)
        if (hacksterRes?.status === 'ok' && Array.isArray(hacksterRes.items)) {
          hacksterRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'HACKSTER',
                'Hackster.io',
                'Hardware e IoT',
                'assets/blog/blog-1.png',
                `hackster-${idx}`
              )
            );
          });
        }

        // 2. Advantech (Telemetría, Routers Industriales y 4G/5G)
        if (advantechRes?.status === 'ok' && Array.isArray(advantechRes.items)) {
          advantechRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'ADVANTECH',
                'Advantech',
                'Routers & 4G/5G',
                'assets/blog/blog-2.png',
                `advantech-${idx}`
              )
            );
          });
        }

        // 3. IoT Analytics (SCADA, LoRaWAN y Mercado Industrial)
        if (iotAnalyticsRes?.status === 'ok' && Array.isArray(iotAnalyticsRes.items)) {
          iotAnalyticsRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'IOT_ANALYTICS',
                'IoT Analytics',
                'SCADA & IIoT',
                'assets/blog/blog-3.png',
                `iotanalytics-${idx}`
              )
            );
          });
        }

        // 4. IoT For All (Casos de uso general de Internet de las Cosas)
        if (iotForAllRes?.status === 'ok' && Array.isArray(iotForAllRes.items)) {
          iotForAllRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'IOT_FOR_ALL',
                'IoT For All',
                'Casos IIoT',
                'assets/slides/slide-4.png',
                `iotforall-${idx}`
              )
            );
          });
        }

        this.rssPosts.set(livePosts);
        this.lastUpdated.set(new Date());
        this.isLoadingRss.set(false);
      },
      error: (err) => {
        console.error('Error cargando noticias RSS:', err);
        this.isLoadingRss.set(false);
      },
    });
  }

  private transformRssItemToBlogPost(
    item: any,
    sourceCategoryId: string,
    sourceName: string,
    categoryLabel: string,
    defaultImage: string,
    idPrefix: string
  ): BlogPost {
    const imageUrl = this.extractImageUrl(item, defaultImage);
    const excerptText = this.extractExcerpt(item.description || item.content || '');
    const formattedDate = this.formatRssDate(item.pubDate);

    return {
      id: `${idPrefix}-${item.guid || item.link || Math.random()}`,
      image: imageUrl,
      categoryES: `${sourceName} • ${categoryLabel}`,
      categoryEN: `${sourceName} • ${categoryLabel}`,
      titleES: item.title || 'Noticia de Tecnología e IoT',
      titleEN: item.title || 'Technology & IoT News',
      excerptES: excerptText,
      excerptEN: excerptText,
      contentES: [excerptText],
      contentEN: [excerptText],
      date: formattedDate,
      readTime: '3 min',
      author: item.author || sourceName,
      externalUrl: item.link,
      sourceName: sourceName,
      sourceCategoryId: sourceCategoryId,
    };
  }

  private extractImageUrl(item: any, defaultImage: string): string {
    if (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http')) {
      return item.thumbnail;
    }
    if (item.enclosure && item.enclosure.link && typeof item.enclosure.link === 'string' && item.enclosure.link.startsWith('http')) {
      return item.enclosure.link;
    }
    if (item.description && typeof item.description === 'string') {
      const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        let src = imgMatch[1];
        if (src.startsWith('//')) src = 'https:' + src;
        return src;
      }
    }
    return defaultImage;
  }

  private extractExcerpt(description: string, maxLength: number = 160): string {
    if (!description) return '';
    const clean = description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean.length > maxLength) {
      return clean.substring(0, maxLength) + '...';
    }
    return clean;
  }

  private formatRssDate(pubDateStr: string): string {
    if (!pubDateStr) return new Date().toLocaleDateString();
    try {
      const d = new Date(pubDateStr);
      if (isNaN(d.getTime())) return pubDateStr;
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return pubDateStr;
    }
  }

  public filterCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  public get filteredPosts(): BlogPost[] {
    const cat = this.selectedCategory();
    const all = [...this.blogPosts, ...this.rssPosts()];
    if (cat === 'ALL') return all;
    if (cat === 'HARDWARE_IOT') {
      return all.filter((p) => p.sourceCategoryId === 'HACKSTER' || p.categoryES.includes('Hardware') || p.categoryES.includes('Radio Mesh'));
    }
    if (cat === 'ROUTERS_4G_5G') {
      return all.filter((p) => p.sourceCategoryId === 'ADVANTECH' || p.categoryES.includes('MQTT') || p.categoryES.includes('Routers'));
    }
    if (cat === 'SCADA') {
      return all.filter((p) => p.sourceCategoryId === 'IOT_ANALYTICS' || p.categoryES.includes('SCADA'));
    }
    return all;
  }

  public openArticle(post: BlogPost): void {
    this.selectedPost.set(post);
  }

  public closeArticle(): void {
    this.selectedPost.set(null);
  }
}
