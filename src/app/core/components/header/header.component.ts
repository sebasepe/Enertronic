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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public themeService = inject(ThemeService);
  public langService = inject(LanguageService);

  public navItems = [
    { labelES: 'INICIO', labelEN: 'HOME', route: '/home' },
    { labelES: 'LA EMPRESA', labelEN: 'COMPANY', route: '/la-empresa' },
    { labelES: 'PRODUCTOS', labelEN: 'PRODUCTS', route: '/productos' },
    { labelES: 'SOLUCIONES', labelEN: 'SOLUTIONS', route: '/soluciones' },
    { labelES: 'CONTACTOS', labelEN: 'CONTACT', route: '/contactos' },
  ];
}
