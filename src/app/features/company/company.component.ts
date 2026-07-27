import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="feature-page-container">
      <div class="page-header">
        <span class="badge">NOSOTROS</span>
        <h1>{{ langService.currentLang() === 'ES' ? 'LA EMPRESA' : 'THE COMPANY' }}</h1>
        <p>{{ langService.currentLang() === 'ES' ? 'Más de 20 años de experiencia transformando la infraestructura de telemetría y control industrial.' : 'Over 20 years of experience transforming industrial telemetry and control infrastructure.' }}</p>
      </div>

      <div class="company-grid">
        <mat-card class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">flag</mat-icon>
            <mat-card-title>{{ langService.currentLang() === 'ES' ? 'Misión' : 'Mission' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ langService.currentLang() === 'ES' ? 'Proveer soluciones tecnológicas avanzadas en automatización, telemetría y SCADA para procesos críticos en Agua, Energía y Oil & Gas con máxima confiabilidad.' : 'Provide advanced technological solutions in automation, telemetry, and SCADA for critical processes in Water, Energy, and Oil & Gas with maximum reliability.' }}</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="info-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="accent">visibility</mat-icon>
            <mat-card-title>{{ langService.currentLang() === 'ES' ? 'Visión' : 'Vision' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ langService.currentLang() === 'ES' ? 'Ser la empresa referente en América Latina en integración de IoT industrial, control remoto inteligente y analítica predictiva de energía.' : 'To be the benchmark company in Latin America in industrial IoT integration, smart remote control, and energy predictive analytics.' }}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .feature-page-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .page-header {
      text-align: center;
      h1 { font-size: 2.5rem; font-weight: 900; margin: 0.5rem 0; color: var(--text-primary, #ffffff); }
      p { font-size: 1.1rem; color: var(--text-secondary, #94a3b8); max-width: 700px; margin: 0 auto; }
      .badge { background: rgba(2,132,199,0.15); color: #38bdf8; padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 0.8rem; }
    }
    .company-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }
    .info-card {
      background: var(--card-bg, #1e293b) !important;
      border: 1px solid var(--card-border, rgba(255,255,255,0.08)) !important;
      padding: 1.5rem;
      border-radius: 16px !important;
    }
  `],
})
export class CompanyComponent {
  public langService = inject(LanguageService);
}
