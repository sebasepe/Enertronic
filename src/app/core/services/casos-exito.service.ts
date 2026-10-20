import { Injectable, signal } from '@angular/core';
import casosData from '../../../../public/data/casos-exito.json';

export interface CaseStudy {
  id: string;
  slug: string;
  titleES: string;
  titleEN: string;
  categoryES: string;
  categoryEN: string;
  categoryId: string;
  client: string;
  location: string;
  image: string;
  icon: string;
  accentColor: string;
  summaryES: string;
  summaryEN: string;
  challengeES: string;
  challengeEN: string;
  solutionES: string;
  solutionEN: string;
  resultsES: string[];
  resultsEN: string[];
  technologies: string[];
  metricsES: string;
  metricsEN: string;
}

export interface CaseCategory {
  id: string;
  labelES: string;
  labelEN: string;
}

@Injectable({
  providedIn: 'root',
})
export class CasosExitoService {
  private readonly caseStudies = signal<CaseStudy[]>(casosData as CaseStudy[]);

  public readonly categories: CaseCategory[] = [
    { id: 'ALL', labelES: 'Todos', labelEN: 'All' },
    { id: 'AGUA', labelES: 'Agua y Saneamiento', labelEN: 'Water & Sanitation' },
    { id: 'OIL_GAS', labelES: 'Oil & Gas', labelEN: 'Oil & Gas' },
    { id: 'MINERIA', labelES: 'Minería e Industria', labelEN: 'Mining & Industry' },
    { id: 'METEOROLOGIA', labelES: 'Meteorología', labelEN: 'Meteorology' },
    { id: 'ENERGIA', labelES: 'Energía', labelEN: 'Energy' },
  ];

  public getCaseStudies(): CaseStudy[] {
    return this.caseStudies();
  }

  public getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return this.caseStudies().find((c) => c.slug === slug);
  }

  public getCaseStudiesByCategory(categoryId: string): CaseStudy[] {
    if (categoryId === 'ALL') {
      return this.caseStudies();
    }
    return this.caseStudies().filter((c) => c.categoryId === categoryId);
  }
}
