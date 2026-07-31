import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { ProjectCardComponent, IndustrialProject } from '../../shared/components/project-card/project-card.component';
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
    ProjectCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public langService = inject(LanguageService);

  public featuredProjects: IndustrialProject[] = [
    {
      id: 'proj-1',
      titleES: 'Parque Fotovoltaico & Telemetría SCADA 50MW',
      titleEN: '50MW Solar Farm & SCADA Telemetry',
      categoryES: 'Energía Renovable',
      categoryEN: 'Renewable Energy',
      descriptionES: 'Sistema centralizado de supervisión y control en tiempo real para inversores, transformadores y subestación eléctrica.',
      descriptionEN: 'Centralized real-time supervision and control system for inverters, transformers, and electrical substation.',
      icon: 'solar_power',
      accentColor: 'linear-gradient(135deg, #f97316, #ea580c)',
      metricsES: '99.98% Tiempo de Actividad SCADA',
      metricsEN: '99.98% SCADA Uptime',
      location: 'Huila, Colombia',
    },
    {
      id: 'proj-2',
      titleES: 'Automatización & Telemetría Acueducto Regional',
      titleEN: 'Regional Aqueduct Automation & Telemetry',
      categoryES: 'Gestión de Agua',
      categoryEN: 'Water Management',
      descriptionES: 'Red de telemetría IoT celular y radiofrecuencia para 14 estaciones de bombeo y tanques de almacenamiento.',
      descriptionEN: 'Cellular and RF IoT telemetry network for 14 pumping stations and storage tanks.',
      icon: 'water_drop',
      accentColor: 'linear-gradient(135deg, #0284c7, #0369a1)',
      metricsES: '-32% Pérdida de Agua Tratada',
      metricsEN: '-32% Treated Water Loss',
      location: 'Antioquia, Colombia',
    },
    {
      id: 'proj-3',
      titleES: 'Supervisión Remota de Oleoducto & Estaciones RTU',
      titleEN: 'Remote Pipeline Supervision & RTU Stations',
      categoryES: 'Oil & Gas',
      categoryEN: 'Oil & Gas',
      descriptionES: 'Monitoreo de presión, temperatura y flujo con válvulas de corte automático alimentadas por paneles solares.',
      descriptionEN: 'Pressure, temperature, and flow monitoring with solar-powered automatic shut-off valves.',
      icon: 'oil_barrel',
      accentColor: 'linear-gradient(135deg, #e11d48, #be123c)',
      metricsES: '45+ Puntos de Control Remoto',
      metricsEN: '45+ Remote Control Points',
      location: 'Llanos Orientales, Colombia',
    },
    {
      id: 'proj-4',
      titleES: 'Plataforma IoT Industrial para Subestaciones',
      titleEN: 'Industrial IoT Platform for Sub-stations',
      categoryES: 'IoT & SCADA',
      categoryEN: 'IoT & SCADA',
      descriptionES: 'Integración de analítica predictiva de energía y telemetría multimarca (Modbus, DNP3, IEC 60870-5-104).',
      descriptionEN: 'Multi-vendor energy predictive analytics and telemetry integration (Modbus, DNP3, IEC 60870-5-104).',
      icon: 'memory',
      accentColor: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      metricsES: '+15,000 Variables Procesadas/seg',
      metricsEN: '+15,000 Variables Processed/sec',
      location: 'Bogotá D.C., Colombia',
    },
  ];

  public stats = [
    { value: '+150', labelES: 'Proyectos SCADA Desplegados', labelEN: 'SCADA Projects Deployed', icon: 'speed' },
    { value: '99.9%', labelES: 'Disponibilidad Telemetría', labelEN: 'Telemetry Availability', icon: 'verified' },
    { value: '+10 Años', labelES: 'Experiencia en Ingeniería', labelEN: 'Engineering Experience', icon: 'history_edu' },
    { value: '+5M', labelES: 'Datos de Campo Procesados/Día', labelEN: 'Field Data Processed/Day', icon: 'analytics' },
  ];
}
