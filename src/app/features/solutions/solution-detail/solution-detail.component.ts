import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { SolutionsService, SolutionItem } from '../../../core/services/solutions.service';
import { LanguageService } from '../../../core/services/language.service';
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
  public solutionsService = inject(SolutionsService);
  public langService = inject(LanguageService);

  public solution?: SolutionItem;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadSolution(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  private loadSolution(slug: string): void {
    const found = this.solutionsService.getSolutionBySlug(slug);
    if (!found) {
      this.router.navigate(['/soluciones']);
      return;
    }
    this.solution = found;
  }
}
