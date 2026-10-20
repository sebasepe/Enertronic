import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CasosExitoService, CaseStudy, CaseCategory } from '../../core/services/casos-exito.service';
import { SeoService } from '../../core/services/seo.service';

export type { CaseStudy, CaseCategory };

@Component({
  selector: 'app-casos-exito',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    TranslatePipe,
  ],
  templateUrl: './casos-exito.component.html',
  styleUrl: './casos-exito.component.scss',
})
export class CasosDeExitoComponent implements OnInit {
  public langService = inject(LanguageService);
  public casosService = inject(CasosExitoService);
  private seoService = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public selectedCategory = signal<string>('ALL');
  public selectedStudy = signal<CaseStudy | null>(null);

  public get categories(): CaseCategory[] {
    return this.casosService.categories;
  }

  public get caseStudies(): CaseStudy[] {
    return this.casosService.getCaseStudies();
  }

  constructor() {
    effect(() => {
      const study = this.selectedStudy();
      if (study) {
        this.applyStudySeo(study);
      } else {
        this.resetCasosSeo();
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        const study = this.casosService.getCaseStudyBySlug(slug) ?? null;
        this.selectedStudy.set(study);
      } else {
        this.selectedStudy.set(null);
      }
    });
  }

  private applyStudySeo(study: CaseStudy): void {
    const isEs = this.langService.currentLang() === 'ES';
    const title = isEs ? study.titleES : study.titleEN;
    const desc = isEs ? study.summaryES : study.summaryEN;
    const imageUrl = `https://enertronic.com.pe/${study.image}`;

    this.seoService.updateMetaTags({
      title: `${title} | Casos de Éxito Enertronic`,
      description: desc,
      keywords: `${study.client}, ${isEs ? study.categoryES : study.categoryEN}, telemetría industrial Perú, SCADA, ${study.technologies.join(', ')}`,
      image: imageUrl,
      canonical: `https://enertronic.com.pe/casos-de-exito/${study.slug}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: `${desc} Solución técnica: ${isEs ? study.solutionES : study.solutionEN}`,
        image: [imageUrl],
        articleSection: isEs ? study.categoryES : study.categoryEN,
        keywords: study.technologies.join(', '),
        author: {
          '@type': 'Organization',
          name: 'Enertronic Ingeniería S.A.C.',
          url: 'https://enertronic.com.pe/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Enertronic Ingeniería S.A.C.',
          logo: 'https://enertronic.com.pe/assets/favicon-icon.png',
        },
        about: {
          '@type': 'Organization',
          name: study.client,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://enertronic.com.pe/casos-de-exito/${study.slug}`,
        },
      },
    });
  }

  private resetCasosSeo(): void {
    this.seoService.updateMetaTags({
      title: 'Casos de Éxito en Telemetría y SCADA Industrial | Enertronic',
      description: 'Conoce nuestros proyectos de telemetría, implementación IIoT en minería y casos de éxito SCADA industrial en Perú. Soluciones reales y comprobadas.',
      keywords: 'Proyectos de telemetría en Perú, Casos de éxito SCADA industrial, Implementación IIoT en minería, Proyectos de automatización energía y agua',
      canonical: 'https://enertronic.com.pe/casos-de-exito',
    });
  }

  public filterCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  public get filteredCaseStudies(): CaseStudy[] {
    return this.casosService.getCaseStudiesByCategory(this.selectedCategory());
  }

  public openModal(study: CaseStudy): void {
    this.router.navigate(['/casos-de-exito', study.slug]);
  }

  public closeModal(): void {
    this.router.navigate(['/casos-de-exito']);
  }
}
