import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { LanguageService } from '../../core/services/language.service';
import { BlogService, BlogPost } from '../../core/services/blog.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
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

  ngOnInit(): void {
    this.blogService.loadRssFeeds();
    this.timerSubscription = timer(15 * 60 * 1000, 15 * 60 * 1000).subscribe(() => {
      this.blogService.loadRssFeeds();
    });

    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const postId = params['post'];
      if (postId) {
        const post = this.blogService.getPostById(postId);
        if (post) {
          this.selectedPost.set(post);
        }
      }
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
    this.selectedPost.set(post);
  }

  public closeArticle(): void {
    this.selectedPost.set(null);
  }
}

