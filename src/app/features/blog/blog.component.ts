import { Component, OnInit, OnDestroy, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { LanguageService } from '../../core/services/language.service';
import { BlogService, BlogPost } from '../../core/services/blog.service';
import { SeoService } from '../../core/services/seo.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    TranslatePipe,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogService = inject(BlogService);
  public langService = inject(LanguageService);
  private seoService = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private timerSubscription?: Subscription;
  private routeSubscription?: Subscription;

  public selectedCategory = signal<string>('ALL');
  public selectedPost = signal<BlogPost | null>(null);

  public categories = [
    { id: 'ALL', labelES: 'Todos', labelEN: 'All' },
    { id: 'HARDWARE_IOT', labelES: 'Hardware & IoT', labelEN: 'Hardware & IoT' },
    { id: 'ROUTERS_4G_5G', labelES: 'Routers & 4G/5G', labelEN: 'Routers & 4G/5G' },
    { id: 'SCADA', labelES: 'SCADA', labelEN: 'SCADA' },
  ];

  constructor() {
    // Si cambia el idioma o el post seleccionado, actualizamos dinámicamente el SEO
    effect(() => {
      const post = this.selectedPost();
      if (post) {
        this.applyPostSeo(post);
      } else {
        this.resetBlogSeo();
      }
    });
  }

  ngOnInit(): void {
    this.blogService.loadRssFeeds();
    this.timerSubscription = timer(15 * 60 * 1000, 15 * 60 * 1000).subscribe(() => {
      this.blogService.loadRssFeeds();
    });

    // Detectar slug en la ruta (/blog/:slug) o parámetro query (?post=...)
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || this.route.snapshot.queryParams['post'];
      if (slug) {
        this.resolvePost(slug);
      } else {
        this.selectedPost.set(null);
      }
    });
  }

  private resolvePost(slug: string): void {
    const post = this.blogService.getPostById(slug);
    if (post) {
      this.selectedPost.set(post);
      return;
    }

    // Si aún no está cargado (feed RSS en proceso de descarga), esperamos su resolución
    const checkTimer = setInterval(() => {
      const delayedPost = this.blogService.getPostById(slug);
      if (delayedPost) {
        this.selectedPost.set(delayedPost);
        clearInterval(checkTimer);
      }
    }, 400);

    setTimeout(() => clearInterval(checkTimer), 5000);
  }

  private applyPostSeo(post: BlogPost): void {
    const isEs = this.langService.currentLang() === 'ES';
    const title = isEs ? post.titleES : post.titleEN;
    const desc = isEs ? post.excerptES : post.excerptEN;
    const imageUrl = post.image?.startsWith('http')
      ? post.image
      : `https://enertronic.com.pe/${post.image}`;

    this.seoService.updateMetaTags({
      title: `${title} | Blog Enertronic`,
      description: desc,
      keywords: `${isEs ? post.categoryES : post.categoryEN}, telemetría, SCADA, automatización industrial, IIoT Perú`,
      image: imageUrl,
      canonical: `https://enertronic.com.pe/blog/${post.id}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: desc,
        image: [imageUrl],
        author: {
          '@type': 'Person',
          name: post.author || 'Equipo Técnico Enertronic',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Enertronic Ingeniería S.A.C.',
          logo: 'https://enertronic.com.pe/assets/favicon-icon.png',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://enertronic.com.pe/blog/${post.id}`,
        },
      },
    });
  }

  private resetBlogSeo(): void {
    this.seoService.updateMetaTags({
      title: 'Blog de Telemetría, SCADA y Automatización | Enertronic',
      description: 'Descubre tendencias en automatización industrial 2026, qué es la telemetría IIoT, protocolos Modbus/MQTT y ventajas de integrar SCADA con IA.',
      keywords: '¿Qué es la telemetría IIoT?, Ventajas de integrar SCADA con Inteligencia Artificial, Protocolos industriales Modbus, DNP3 y MQTT, telemetría con energía solar, Tendencias automatización industrial 2026',
      canonical: 'https://enertronic.com.pe/blog',
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  public filterCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  public get filteredPosts(): BlogPost[] {
    const cat = this.selectedCategory();
    const all = this.blogService.getAllPosts();
    if (cat === 'ALL') return all;
    if (cat === 'HARDWARE_IOT') {
      return all.filter((p) => p.sourceCategoryId === 'HARDWARE_IOT' || p.sourceCategoryId === 'HACKSTER' || p.categoryES.includes('Hardware') || p.categoryES.includes('Radio Mesh'));
    }
    if (cat === 'ROUTERS_4G_5G') {
      return all.filter((p) => p.sourceCategoryId === 'ROUTERS_4G_5G' || p.sourceCategoryId === 'ADVANTECH' || p.categoryES.includes('MQTT') || p.categoryES.includes('Routers'));
    }
    if (cat === 'SCADA') {
      return all.filter((p) => p.sourceCategoryId === 'SCADA' || p.sourceCategoryId === 'IOT_ANALYTICS' || p.categoryES.includes('SCADA'));
    }
    return all;
  }

  public openArticle(post: BlogPost): void {
    this.router.navigate(['/blog', post.id]);
  }

  public closeArticle(): void {
    this.router.navigate(['/blog']);
  }
}
