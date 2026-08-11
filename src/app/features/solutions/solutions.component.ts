import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';
import { SolutionsService, SolutionItem } from '../../core/services/solutions.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  public langService = inject(LanguageService);
  public solutionsService = inject(SolutionsService);

  public get solutionList(): SolutionItem[] {
    return this.solutionsService.getSolutions();
  }
}
