import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="feature-page-container">
      <div class="page-header">
        <span class="badge">CONTACTO TÉCNICO</span>
        <h1>{{ langService.currentLang() === 'ES' ? 'CONTÁCTANOS' : 'CONTACT US' }}</h1>
        <p>{{ langService.currentLang() === 'ES' ? 'Solicita asesoría con nuestro equipo de ingenieros especialistas en automatización.' : 'Request advice from our team of specialist automation engineers.' }}</p>
      </div>

      <div class="contact-grid">
        <mat-card class="form-card">
          <h2>{{ langService.currentLang() === 'ES' ? 'Enviar Mensaje' : 'Send Message' }}</h2>
          <form class="contact-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre Completo / Full Name</mat-label>
              <input matInput placeholder="Ej. Ing. Carlos Rodríguez" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Correo Electrónico / Email</mat-label>
              <input matInput type="email" placeholder="correo@empresa.com" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Empresa / Sector</mat-label>
              <input matInput placeholder="Ej. Acueducto / Energía / Oil & Gas" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Detalles del Proyecto / Project Details</mat-label>
              <textarea matInput rows="4" placeholder="Describe los requerimientos de telemetría o SCADA..."></textarea>
            </mat-form-field>

            <button mat-raised-button color="primary" type="button" class="submit-btn">
              <mat-icon>send</mat-icon>
              <span>{{ langService.currentLang() === 'ES' ? 'Enviar Solicitud' : 'Send Request' }}</span>
            </button>
          </form>
        </mat-card>

        <div class="info-sidebar">
          <div class="info-box">
            <mat-icon class="box-icon">location_on</mat-icon>
            <div>
              <h3>{{ langService.currentLang() === 'ES' ? 'Sede Principal' : 'Headquarters' }}</h3>
              <p>Centro de Ingeniería SCADA, Bogotá D.C., Colombia</p>
            </div>
          </div>

          <div class="info-box">
            <mat-icon class="box-icon">phone</mat-icon>
            <div>
              <h3>{{ langService.currentLang() === 'ES' ? 'Línea Directa' : 'Direct Line' }}</h3>
              <p>+57 (601) 800-ENER / (+57) 300 000 0000</p>
            </div>
          </div>

          <div class="info-box">
            <mat-icon class="box-icon">email</mat-icon>
            <div>
              <h3>{{ langService.currentLang() === 'ES' ? 'Correo Electrónico' : 'Email' }}</h3>
              <p>ingenieria&#64;enertronic.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .feature-page-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; display: flex; flex-direction: column; gap: 3rem; }
    .page-header { text-align: center; h1 { font-size: 2.5rem; font-weight: 900; color: var(--text-primary, #ffffff); } p { color: var(--text-secondary, #94a3b8); } .badge { background: rgba(2,132,199,0.15); color: #38bdf8; padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 0.8rem; } }
    .contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2.5rem; @media (max-width: 900px) { grid-template-columns: 1fr; } }
    .form-card { background: var(--card-bg, #1e293b) !important; border: 1px solid var(--card-border, rgba(255,255,255,0.08)) !important; padding: 2rem; border-radius: 16px !important; h2 { color: var(--text-primary, #fff); margin-top: 0; } }
    .contact-form { display: flex; flex-direction: column; gap: 1rem; }
    .full-width { width: 100%; }
    .submit-btn { height: 48px; mat-icon { margin-right: 0.5rem; } }
    .info-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
    .info-box { display: flex; align-items: flex-start; gap: 1rem; background: var(--card-bg, #1e293b); border: 1px solid var(--card-border, rgba(255,255,255,0.08)); padding: 1.5rem; border-radius: 16px; h3 { margin: 0; color: var(--text-primary, #fff); font-size: 1.1rem; } p { margin: 4px 0 0 0; color: var(--text-secondary, #94a3b8); font-size: 0.9rem; } }
    .box-icon { font-size: 28px; width: 28px; height: 28px; color: #ea580c; }
  `],
})
export class ContactComponent {
  public langService = inject(LanguageService);
}
