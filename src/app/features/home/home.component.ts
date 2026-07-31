import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HeroBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public langService = inject(LanguageService);

  public stats = [
    { value: '+150', labelES: 'Proyectos SCADA Desplegados', labelEN: 'SCADA Projects Deployed', icon: 'speed' },
    { value: '99.9%', labelES: 'Disponibilidad Telemetría', labelEN: 'Telemetry Availability', icon: 'verified' },
    { value: '+10 Años', labelES: 'Experiencia en Ingeniería', labelEN: 'Engineering Experience', icon: 'history_edu' },
    { value: '+5M', labelES: 'Datos de Campo Procesados/Día', labelEN: 'Field Data Processed/Day', icon: 'analytics' },
  ];

  public homeBlogPosts = [
    {
      id: 'post-1',
      image: 'assets/blog/blog-1.png',
      titleES: 'Telemetría por radio mesh 2.4GHz en Perú',
      titleEN: '2.4GHz Mesh Radio Telemetry in Peru',
      excerptES: 'Integra sensores dispersos en tu planta mediante telemetría por radio mesh 2.4GHz sin necesidad de...',
      excerptEN: 'Integrate scattered sensors in your plant using 2.4GHz mesh radio telemetry without needing...',
    },
    {
      id: 'post-2',
      image: 'assets/blog/blog-2.png',
      titleES: 'Telemetría vía MQTT para proyectos IIoT en Perú',
      titleEN: 'MQTT Telemetry for IIoT Projects in Peru',
      excerptES: 'Conecta tus sensores a la nube mediante telemetría vía MQTT con el respaldo de nuestro...',
      excerptEN: 'Connect your sensors to the cloud via MQTT telemetry backed by our...',
    },
    {
      id: 'post-3',
      image: 'assets/blog/blog-3.png',
      titleES: 'Automatización de software SCADA en Perú',
      titleEN: 'SCADA Software Automation in Peru',
      excerptES: '¿Necesitas automatización SCADA en Perú? En Enertronic diseñamos e implementamos soluciones industriales a medida....',
      excerptEN: 'Need SCADA automation in Peru? At Enertronic we design and implement custom industrial solutions...',
    },
  ];
}
