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
    .feature-page-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; display: flex; flex-direction: column; gap: 3rem; }
    .page-header { text-align: center; h1 { font-size: 2.5rem; font-weight: 900; color: var(--text-primary, #ffffff); } p { color: var(--text-secondary, #94a3b8); } .badge { background: rgba(234,88,12,0.15); color: #f97316; padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 0.8rem; } }
    .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; @media (max-width: 900px) { grid-template-columns: 1fr; } }
    .product-card { background: var(--card-bg, #1e293b) !important; border: 1px solid var(--card-border, rgba(255,255,255,0.08)) !important; border-radius: 16px !important; }
    .card-icon-header { height: 100px; background: linear-gradient(135deg, #0284c7, #1e3a8a); display: flex; align-items: center; justify-content: center; color: #fff; mat-icon { font-size: 40px; width: 40px; height: 40px; } }
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
