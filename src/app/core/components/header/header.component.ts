import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { SolutionsService, SolutionItem } from '../../services/solutions.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public themeService = inject(ThemeService);
  public langService = inject(LanguageService);
  public solutionsService = inject(SolutionsService);

  public navItems = [
    { labelES: 'INICIO', labelEN: 'HOME', route: '/home' },
    { labelES: 'LA EMPRESA', labelEN: 'COMPANY', route: '/la-empresa' },
    { labelES: 'SOLUCIONES', labelEN: 'SOLUTIONS', route: '/soluciones' },
    { labelES: 'CASOS DE ÉXITO', labelEN: 'CASE STUDIES', route: '/casos-de-exito' },
    { labelES: 'BLOG', labelEN: 'BLOG', route: '/blog' },
    { labelES: 'CONTACTOS', labelEN: 'CONTACT', route: '/contactos' },
  ];

  public get solutionsList(): SolutionItem[] {
    return this.solutionsService.getSolutions();
  }
}
