import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import clientsData from '../../../../public/data/clients.json';

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  sectorES: string;
  sectorEN: string;
}

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

  public clientList: ClientItem[] = clientsData as ClientItem[];
}
