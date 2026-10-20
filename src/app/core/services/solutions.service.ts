import { Injectable, signal } from '@angular/core';
import solutionsData from '../../../../public/data/solutions.json';

export interface SolutionSpec {
  labelES: string;
  labelEN: string;
  valueES: string;
  valueEN: string;
}

export interface SolutionBenefit {
  icon: string;
  titleES: string;
  titleEN: string;
  descES: string;
  descEN: string;
}

export interface SolutionModel {
  name: string;
  specsES: string;
  specsEN: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  icon: string;
  categoryES: string;
  categoryEN: string;
  titleES: string;
  titleEN: string;
  shortTitleES: string;
  shortTitleEN: string;
  taglineES: string;
  taglineEN: string;
  descES: string;
  descEN: string;
  referentialImage: string;
  imageBadgeES: string;
  imageBadgeEN: string;
  overviewES: string;
  overviewEN: string;
  specs: SolutionSpec[];
  applicationsES: string[];
  applicationsEN: string[];
  benefits: SolutionBenefit[];
  highlightsES: string[];
  highlightsEN: string[];
  models?: SolutionModel[];
}

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  private readonly solutions = signal<SolutionItem[]>(solutionsData as SolutionItem[]);

  public getSolutions(): SolutionItem[] {
    return this.solutions();
  }

  public getSolutionBySlug(slug: string): SolutionItem | undefined {
    return this.solutions().find((s) => s.slug === slug);
  }
}
