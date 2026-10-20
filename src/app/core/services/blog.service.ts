import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import blogPostsData from '../../../../public/data/blog-posts.json';

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

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);

  public isLoadingRss = signal<boolean>(false);
  public lastUpdated = signal<Date | null>(null);
  public rssPosts = signal<BlogPost[]>([]);

  // Artículos locales técnicos y de ingeniería para Enertronic Perú cargados desde public/data/blog-posts.json
  public readonly staticPosts: BlogPost[] = blogPostsData as BlogPost[];

  public getAllPosts(): BlogPost[] {
    return [...this.staticPosts, ...this.rssPosts()];
  }

  public getLatestPosts(limit: number = 3): BlogPost[] {
    const all = this.getAllPosts();
    return all.slice(0, limit);
  }

  public getPostById(id: string): BlogPost | undefined {
    return this.getAllPosts().find((p) => p.id === id);
  }

  public loadRssFeeds(): void {
    if (this.isLoadingRss()) return;
    this.isLoadingRss.set(true);

    const sources = [
      {
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://iot-analytics.com/category/industrial-iot/feed/',
        id: 'IOT_ANALYTICS',
        name: 'IoT Analytics',
        category: 'SCADA & IIoT',
        image: 'assets/blog/blog-3.png',
        prefix: 'iotanalytics',
      },
      {
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.iotforall.com/feed',
        id: 'IOT_FOR_ALL',
        name: 'IoT For All',
        category: 'Casos IIoT',
        image: 'assets/slides/slide-4.png',
        prefix: 'iotforall',
      },
    ];

    forkJoin(sources.map((s) => this.fetchRssFeed(s.url))).subscribe({
      next: (results) => {
        const livePosts: BlogPost[] = [];
        results.forEach((res, i) => {
          const s = sources[i];
          if (res?.status === 'ok' && Array.isArray(res.items)) {
            res.items.slice(0, 6).forEach((item: any, idx: number) =>
              livePosts.push(this.transformRssItemToBlogPost(item, s.id, s.name, s.category, s.image, `${s.prefix}-${idx}`))
            );
          }
        });
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

  private fetchRssFeed(url: string) {
    return this.http.get<any>(url).pipe(catchError(() => of({ status: 'error', items: [] })));
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
      author: this.cleanAuthorName(item.author, sourceName),
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

  private cleanAuthorName(rawAuthor: string, defaultName: string): string {
    if (!rawAuthor || typeof rawAuthor !== 'string') return defaultName;
    let author = rawAuthor.trim();
    if (!author) return defaultName;

    const matches = author.match(/\(([^()]+)\)/g);
    if (matches && matches.length > 0) {
      for (let i = matches.length - 1; i >= 0; i--) {
        const matchText = matches[i].replace(/[()]/g, '').trim();
        if (matchText && !matchText.includes('@') && !matchText.startsWith('http')) {
          return matchText;
        }
      }
    }

    try {
      author = decodeURIComponent(author);
    } catch {}

    author = author.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '').trim();
    author = author.replace(/https?:\/\/\S+/g, '').replace(/[a-zA-Z0-9-]+\.(com|org|net|io|edu|gov|co|pe)[^\s]*/gi, '').trim();
    author = author.replace(/^[\s\-_:;()]+|[\s\-_:;()]+$/g, '').trim();

    if (!author || author.length < 2) {
      return defaultName;
    }
    return author;
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
}
