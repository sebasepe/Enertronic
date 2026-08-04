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

export interface MegaMenuItem {
  icon: string;
  shortTitleES: string;
  shortTitleEN: string;
}

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
    { labelES: 'SOLUCIONES', labelEN: 'SOLUTIONS', route: '/soluciones' },
    { labelES: 'BLOG', labelEN: 'BLOG', route: '/blog' },
    { labelES: 'CONTACTOS', labelEN: 'CONTACT', route: '/contactos' },
  ];

  public solutionsList: MegaMenuItem[] = [
    {
      icon: 'cell_tower',
      shortTitleES: 'Telemetría Celular 2G 3G 4G',
      shortTitleEN: '2G 3G 4G Cellular Telemetry',
    },
    {
      icon: 'satellite_alt',
      shortTitleES: 'Telemetría Satelital Iridium',
      shortTitleEN: 'Iridium Satellite Telemetry',
    },
    {
      icon: 'satellite',
      shortTitleES: 'Telemetría Satelital STARLINK',
      shortTitleEN: 'STARLINK Satellite Telemetry',
    },
    {
      icon: 'rss_feed',
      shortTitleES: 'Telemetría Radio Mesh 2.4GHz',
      shortTitleEN: '2.4GHz Mesh Radio Telemetry',
    },
    {
      icon: 'swap_calls',
      shortTitleES: 'Telemetría MQTT',
      shortTitleEN: 'MQTT Telemetry',
    },
    {
      icon: 'lan',
      shortTitleES: 'Telemetría Ethernet',
      shortTitleEN: 'Ethernet Telemetry',
    },
    {
      icon: 'wifi',
      shortTitleES: 'Telemetría WIFI',
      shortTitleEN: 'WiFi Telemetry',
    },
    {
      icon: 'public',
      shortTitleES: 'Satelital Inmarsat BGAN M2M',
      shortTitleEN: 'Inmarsat BGAN M2M Satellite',
    },
    {
      icon: 'sensors',
      shortTitleES: 'Telemetría LoRaWAN',
      shortTitleEN: 'LoRaWAN Telemetry',
    },
    {
      icon: 'transform',
      shortTitleES: 'Túnel Inalámbrico 2.4GHz',
      shortTitleEN: '2.4GHz Wireless Tunnel',
    },
    {
      icon: 'visibility',
      shortTitleES: 'Visión Remota & SCADA',
      shortTitleEN: 'Remote Vision & SCADA',
    },
  ];
}
