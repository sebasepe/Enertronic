import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="feature-page-container">
      <div class="page-header">
        <span class="badge">HARDWARE & SOFTWARE</span>
        <h1>{{ langService.currentLang() === 'ES' ? 'PRODUCTOS ENERTRONIC' : 'ENERTRONIC PRODUCTS' }}</h1>
        <p>{{ langService.currentLang() === 'ES' ? 'Equipos de grado industrial para telemetría, RTUs, dataloggers y software SCADA.' : 'Industrial-grade equipment for telemetry, RTUs, dataloggers, and SCADA software.' }}</p>
      </div>

      <div class="products-grid">
        @for (prod of productList; track prod.name) {
          <mat-card class="product-card">
            <div class="card-icon-header">
              <mat-icon>{{ prod.icon }}</mat-icon>
            </div>
            <mat-card-content>
              <h3>{{ prod.name }}</h3>
              <p>{{ langService.currentLang() === 'ES' ? prod.descES : prod.descEN }}</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary">Ficha Técnica PDF</button>
            </mat-card-actions>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .feature-page-container { max-width: 1240px; margin: 2.5rem auto 5rem auto; padding: 0 1.5rem; display: flex; flex-direction: column; gap: 3rem; }
    .page-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.65rem; h1 { font-size: 2.2rem; font-weight: 800; color: var(--text-primary, #ffffff); margin: 0; } p { color: var(--text-secondary, #94a3b8); font-size: 1.02rem; max-width: 700px; margin: 0; line-height: 1.6; } .badge { background: rgba(2, 132, 199, 0.08); color: #0284c7; padding: 0.35rem 0.9rem; border-radius: 8px; font-weight: 700; font-size: 0.78rem; border: 1px solid rgba(2, 132, 199, 0.2); } }
    .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; @media (max-width: 900px) { grid-template-columns: 1fr; } }
    .product-card { background: var(--card-bg, #1e293b) !important; border: 1px solid var(--card-border, rgba(255,255,255,0.08)) !important; border-radius: 12px !important; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important; overflow: hidden; }
    .product-card:hover { transform: translateY(-3px) !important; border-color: rgba(2, 132, 199, 0.35) !important; box-shadow: 0 12px 24px -4px rgba(0,0,0,0.25) !important; }
    .card-icon-header { height: 110px; background: #0f172a; border-bottom: 1px solid var(--card-border, rgba(255,255,255,0.05)); display: flex; align-items: center; justify-content: center; color: #0284c7; mat-icon { font-size: 38px; width: 38px; height: 38px; } }
  `],
})
export class ProductsComponent {
  public langService = inject(LanguageService);

  public productList = [
    { name: 'RTU-IoT Enertronic 500', icon: 'memory', descES: 'Unidad Terminal Remota ultra compacta con 4G LTE y energía solar.', descEN: 'Ultra-compact Remote Terminal Unit with 4G LTE and solar power.' },
    { name: 'Estación de Telemetría Acueductos', icon: 'water_drop', descES: 'Datalogger multiparámetro de presión, caudal y nivel con IP68.', descEN: 'Multiparameter pressure, flow, and level datalogger with IP68 rating.' },
    { name: 'Enertronic SCADA Suite 4.0', icon: 'desktop_windows', descES: 'Plataforma web HMI/SCADA de monitoreo en tiempo real e IA predictiva.', descEN: 'Web HMI/SCADA real-time monitoring platform with predictive AI.' },
  ];
}
