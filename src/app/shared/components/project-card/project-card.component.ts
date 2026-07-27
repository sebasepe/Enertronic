import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

export interface IndustrialProject {
  id: string;
  titleES: string;
  titleEN: string;
  categoryES: string;
  categoryEN: string;
  descriptionES: string;
  descriptionEN: string;
  icon: string;
  accentColor: string;
  metricsES: string;
  metricsEN: string;
  location: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: IndustrialProject;
  public langService = inject(LanguageService);
}
