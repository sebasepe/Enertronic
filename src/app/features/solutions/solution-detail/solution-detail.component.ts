import { Component, OnInit, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { SolutionsService, SolutionItem } from '../../../core/services/solutions.service';
import { LanguageService } from '../../../core/services/language.service';
import { SeoService } from '../../../core/services/seo.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-solution-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    TranslatePipe,
  ],
  templateUrl: './solution-detail.component.html',
  styleUrl: './solution-detail.component.scss',
})
export class SolutionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  public solutionsService = inject(SolutionsService);
  public langService = inject(LanguageService);
  private seoService = inject(SeoService);

  public solution?: SolutionItem;

  constructor() {
    effect(() => {
      // Re-aplica SEO si cambia el idioma
      this.langService.currentLang();
      if (this.solution) {
        this.applySolutionSeo(this.solution);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadSolution(slug);
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }

  private loadSolution(slug: string): void {
    const found = this.solutionsService.getSolutionBySlug(slug);
    if (!found) {
      this.router.navigate(['/soluciones-enertronic']);
      return;
    }
    this.solution = found;
    this.applySolutionSeo(found);
  }

  private applySolutionSeo(sol: SolutionItem): void {
    const isEs = this.langService.currentLang() === 'ES';
    const title = isEs ? sol.titleES : sol.titleEN;
    const desc = isEs ? sol.taglineES : sol.taglineEN;
    const imageUrl = `https://enertronic.com.pe/${sol.referentialImage}`;
    const canonical = `https://enertronic.com.pe/soluciones/${sol.slug}`;

    this.seoService.updateMetaTags({
      title: `${title} | Enertronic`,
      description: desc,
      keywords: `${title}, ${isEs ? sol.categoryES : sol.categoryEN}, hardware telemetría, SCADA Perú`,
      image: imageUrl,
      canonical: canonical,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description: desc,
        image: imageUrl,
        brand: {
          '@type': 'Brand',
          name: 'Enertronic',
        },
      },
    });
  }
}
