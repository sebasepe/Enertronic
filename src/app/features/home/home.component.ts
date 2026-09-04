import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    HeroBannerComponent,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public langService = inject(LanguageService);

  public clientList = [
    {
      id: 'sedapal',
      name: 'SEDAPAL',
      logo: 'assets/clients/sedapal.png',
      sectorES: 'Agua Potable',
      sectorEN: 'Sanitation & Drinking Water',
    },
    {
      id: 'morken',
      name: 'MORKEN',
      logo: 'assets/clients/morken.png',
      sectorES: 'Oil & Gas e Infraestructura',
      sectorEN: 'Oil & Gas & Infrastructure',
    },
    {
      id: 'indra',
      name: 'INDRA',
      logo: 'assets/clients/indra.png',
      sectorES: 'Tecnología e Ingeniería',
      sectorEN: 'Technology & Engineering',
    },
    {
      id: 'dini',
      name: 'DINI',
      logo: 'assets/clients/dini.png',
      sectorES: 'Seguridad e Inteligencia',
      sectorEN: 'Security & Intelligence',
    },
    {
      id: 'senamhi',
      name: 'SENAMHI',
      logo: 'assets/clients/senamhi.png',
      sectorES: 'Meteorología e Hidrología',
      sectorEN: 'Meteorology & Hydrology',
    },
    {
      id: 'inacal',
      name: 'INACAL',
      logo: 'assets/clients/inacal.png',
      sectorES: 'Instituto Nacional de Calidad',
      sectorEN: 'National Quality Institute',
    },
    {
      id: 'liftoil',
      name: 'LiftOil',
      logo: 'assets/clients/liftoil.png',
      sectorES: 'Tecnología de Extracción Oil & Gas',
      sectorEN: 'Oil Extraction Technology',
    },
    {
      id: 'electroperu',
      name: 'Electroperú',
      logo: 'assets/clients/electroperu.png',
      sectorES: 'Generación y Energía Eléctrica',
      sectorEN: 'Power Generation & Energy',
    },
  ];
}


