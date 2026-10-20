import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { CasosExitoService, CaseStudy, CaseCategory } from '../../core/services/casos-exito.service';

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
