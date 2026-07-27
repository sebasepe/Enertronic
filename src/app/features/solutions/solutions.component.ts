import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="feature-page-container">
      <div class="page-header">
        <span class="badge">SECTORES INDUSTRIALES</span>
        <h1>{{ langService.currentLang() === 'ES' ? 'SOLUCIONES ENERTRONIC' : 'ENERTRONIC SOLUTIONS' }}</h1>
        <p>{{ langService.currentLang() === 'ES' ? 'Especializados en Agua, Energía, Oil & Gas y Telemetría IoT & SCADA.' : 'Specialized in Water, Energy, Oil & Gas, and Telemetry IoT & SCADA.' }}</p>
      </div>

      <div class="solutions-grid">
        @for (sol of solutionList; track sol.title) {
          <mat-card class="sol-card">
            <mat-card-header>
              <mat-icon mat-card-avatar [style.color]="sol.color">{{ sol.icon }}</mat-icon>
              <mat-card-title>{{ sol.title }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ langService.currentLang() === 'ES' ? sol.descES : sol.descEN }}</p>
            </mat-card-content>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .feature-page-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; display: flex; flex-direction: column; gap: 3rem; }
    .page-header { text-align: center; h1 { font-size: 2.5rem; font-weight: 900; color: var(--text-primary, #ffffff); } p { color: var(--text-secondary, #94a3b8); } .badge { background: rgba(2,132,199,0.15); color: #38bdf8; padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 0.8rem; } }
    .solutions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; @media (max-width: 768px) { grid-template-columns: 1fr; } }
    .sol-card { background: var(--card-bg, #1e293b) !important; border: 1px solid var(--card-border, rgba(255,255,255,0.08)) !important; padding: 1.5rem; border-radius: 16px !important; }
  `],
})
export class SolutionsComponent {
  public langService = inject(LanguageService);

  public solutionList = [
    { title: 'Energía Solar & Hidroeléctrica', icon: 'solar_power', color: '#f97316', descES: 'Telemetría de inversores, subestaciones fotovoltaicas y control de microcentrales hidroeléctricas.', descEN: 'Inverter telemetry, photovoltaic substations, and micro-hydro plant control.' },
    { title: 'Gestión Inteligente de Agua', icon: 'water_drop', color: '#0284c7', descES: 'Telemetría de presión, detección de fugas y automatización de válvulas en acueductos.', descEN: 'Pressure telemetry, leak detection, and valve automation in aqueducts.' },
    { title: 'Oil & Gas Telemetría SCADA', icon: 'oil_barrel', color: '#e11d48', descES: 'Supervisión de pozos, monitoreo de paradas de emergencia (ESD) y transferencia de custodia.', descEN: 'Well supervision, emergency shutdown (ESD) monitoring, and custody transfer.' },
    { title: 'IoT Industrial & Redes SCADA', icon: 'memory', color: '#8b5cf6', descES: 'Integración de protocolos industriales (Modbus, DNP3, IEC 104) y ciberseguridad industrial.', descEN: 'Integration of industrial protocols (Modbus, DNP3, IEC 104) and industrial cybersecurity.' },
  ];
}
