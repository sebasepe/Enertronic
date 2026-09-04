import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export interface CaseStudy {
  id: string;
  titleES: string;
  titleEN: string;
  categoryES: string;
  categoryEN: string;
  categoryId: string;
  client: string;
  location: string;
  image: string;
  icon: string;
  accentColor: string;
  summaryES: string;
  summaryEN: string;
  challengeES: string;
  challengeEN: string;
  solutionES: string;
  solutionEN: string;
  resultsES: string[];
  resultsEN: string[];
  technologies: string[];
  metricsES: string;
  metricsEN: string;
}

@Component({
  selector: 'app-casos-exito',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    TranslatePipe,
  ],
  templateUrl: './casos-exito.component.html',
  styleUrl: './casos-exito.component.scss',
})
export class CasosDeExitoComponent {
  public langService = inject(LanguageService);

  public selectedCategory = signal<string>('ALL');
  public selectedStudy = signal<CaseStudy | null>(null);

  public categories = [
    { id: 'ALL', labelES: 'Todos', labelEN: 'All' },
    { id: 'AGUA', labelES: 'Agua y Saneamiento', labelEN: 'Water & Sanitation' },
    { id: 'OIL_GAS', labelES: 'Oil & Gas', labelEN: 'Oil & Gas' },
    { id: 'MINERIA', labelES: 'Minería e Industria', labelEN: 'Mining & Industry' },
    { id: 'METEOROLOGIA', labelES: 'Meteorología', labelEN: 'Meteorology' },
    { id: 'ENERGIA', labelES: 'Energía', labelEN: 'Energy' },
  ];

  public caseStudies: CaseStudy[] = [
    {
      id: 'caso-1',
      client: 'SEDAPAL',
      categoryId: 'AGUA',
      categoryES: 'Agua Potable y Trasvase Hídrico',
      categoryEN: 'Water & Hydrological Transfer',
      titleES: 'Sistema de Control y Telemetría del Trasvase Huascacocha - Rímac',
      titleEN: 'SCADA Control & Telemetry System for Huascacocha - Rímac Water Transfer',
      location: 'Presa Huascacocha - Cuenca Rímac, Perú',
      image: 'assets/slides/sedapal-huascacocha.jpg',
      icon: 'water_drop',
      accentColor: '#0284c7',
      metricsES: 'Caudal de Trasvase: 1.72 m³/s | Monitoreo en Tiempo Real de Sifones y Túneles',
      metricsEN: 'Transfer Flow: 1.72 m³/s | Real-time Siphon & Tunnel Monitoring',
      summaryES: 'Sistema SCADA de supervisión continua para el esquema hidrológico de trasvase desde la Presa Huascacocha hacia la cuenca del Río Rímac (Canal Marca III) para el abastecimiento de agua en Lima.',
      summaryEN: 'SCADA continuous supervision system for the hydrological transfer scheme from Huascacocha Dam to the Rímac River basin (Marca III Canal) for Lima water supply.',
      challengeES: 'Monitoreo integrativo en alta montaña de múltiples estaciones hidráulicas secuenciales: Presa Huascacocha, Sifones N°1, N°2 y N°3, Túneles N°1 y N°2, Estación de Bombeo y el Canal Marca III.',
      challengeEN: 'High-altitude integrated monitoring of sequential hydraulic stations: Huascacocha Dam, Siphons #1, #2, #3, Tunnels #1 & #2, Pumping Station, and Marca III Canal.',
      solutionES: 'Despliegue del Sistema de Control SCADA con adquisición en tiempo real de caudal de descarga (1.72 m³/s) y niveles de canal (0.64m en Presa, 1.68m en Sifón N°2, 1.38m en Sifón N°3) con telemetría industrial Enertronic.',
      solutionEN: 'Deployment of SCADA Control System acquiring real-time discharge flow (1.72 m³/s) and channel levels (0.64m at Dam, 1.68m at Siphon #2, 1.38m at Siphon #3) with Enertronic industrial telemetry.',
      resultsES: [
        'Supervisión en tiempo real de caudal de descarga (1.72 m³/s) en Presa Huascacocha y Estación de Bombeo.',
        'Monitoreo continuo de nivel de canal en Entrada/Salida Sifón N°1, Sifón N°2 (1.68 m) y Sifón N°3 (1.38 m).',
        'Control del flujo de agua dulce entregado hacia el Canal Marca III para el abastecimiento potable de Lima.',
        'Gestión centralizada de alarmas de nivel y caudal con redundancia de transmisión de datos.',
      ],
      resultsEN: [
        'Real-time supervision of discharge flow rate (1.72 m³/s) at Huascacocha Dam and Pumping Station.',
        'Continuous channel level monitoring at Siphon #1 inlet/outlet, Siphon #2 (1.68 m), and Siphon #3 (1.38 m).',
        'Flow control of freshwater delivered to Marca III Canal for Metropolitan Lima drinking water supply.',
        'Centralized level and flow alarm management with data transmission redundancy.',
      ],
      technologies: ['Sistema SCADA', 'Telemetría Satelital', 'Sensores de Nivel Radar', 'Medición de Caudal', 'Sifones y Túneles', 'ISA/IEC 62443'],
    },

    {
      id: 'caso-5',
      client: 'ELECTROPERÚ',
      categoryId: 'ENERGIA',
      categoryES: 'Generación Eléctrica e Infraestructura Hidráulica',
      categoryEN: 'Hydroelectric Generation & Hydraulic Infrastructure',
      titleES: 'Sistema de Monitoreo y Telemetría del Túnel de Aducción (Complejo Hidroeléctrico del Mantaro)',
      titleEN: 'Monitoring & Telemetry System for the Adduction Tunnel (Mantaro Hydroelectric Complex)',
      location: 'Presa Tablachaca - Huancavelica, Perú',
      image: 'assets/slides/electroperu-tunel-mantaro.png',
      icon: 'bolt',
      accentColor: '#dc2626',
      metricsES: 'Túnel de Presión 19,813 m | Alertas en Tiempo Real ≥ 4 m.c.a.',
      metricsEN: '19,813 m Pressure Tunnel | Real-time Alarms ≥ 4 m.w.c.',
      summaryES: 'Sistema de monitoreo y telemetría en tiempo real del túnel de aducción de 19 813 m en el Complejo Hidroeléctrico del Mantaro (Electroperú), desde la presa Tablachaca (2 680 m.s.n.m.) hasta la casa de máquinas en el río Colcabamba (1 840 m.s.n.m.).',
      summaryEN: 'Real-time telemetry and monitoring system for the 19,813 m adduction tunnel at the Mantaro Hydroelectric Complex (Electroperú), connecting Tablachaca dam (2,680 m.a.s.l.) to Colcabamba powerhouse (1,840 m.a.s.l.).',
      challengeES: 'Este proyecto corresponde al sistema de monitoreo y telemetría en tiempo real del túnel de aducción del Complejo Hidroeléctrico del Mantaro, operado por Electroperú en Huancavelica. La obra civil comprende un túnel de presión de 19 813 metros de longitud que conduce el caudal desde la presa Tablachaca (a más de 2 680 m.s.n.m.) atravesando los Andes hasta la cámara de válvulas, el pozo de oscilación y la tubería forzada, para finalmente alimentar la casa de máquinas en el río Colcabamba (a unos 1 840 m.s.n.m.) y generar energía eléctrica.',
      challengeEN: 'This project corresponds to the real-time monitoring and telemetry system of the adduction tunnel of the Mantaro Hydroelectric Complex, operated by Electroperú in Huancavelica. The civil structure comprises a 19,813-meter long pressure tunnel conveying flow from the Tablachaca dam (over 2,680 m.a.s.l.) through the Andes to the valve chamber, surge shaft, and penstock, feeding the powerhouse at the Colcabamba River (1,840 m.a.s.l.) to generate electricity.',
      solutionES: 'El panel de control supervisa la estabilidad hidráulica interna mediante sensores de presión instalados en ventanas de acceso intermedias (como las ventanas 3 y 4), registrando lecturas en bar y metros de columna de agua (m.c.a.) con alertas automáticas frente a un umbral crítico mínimo fijado en 4 m.c.a. Este control previene riesgos de despresurización, roturas o efectos de cavitación durante las oscilaciones causadas por la regulación de las turbinas, protegiendo así la infraestructura crítica de la central hidroeléctrica más importante del sistema eléctrico del Perú.',
      solutionEN: 'The control panel monitors internal hydraulic stability through pressure sensors installed at intermediate access windows (such as windows 3 and 4), recording readings in bar and meters of water column (m.w.c.) with automated alarms against a minimum critical threshold set at 4 m.w.c. This prevents risks of depressurization, pipe rupture, or cavitation during surges caused by turbine regulation, safeguarding the most critical hydroelectric infrastructure in Peru.',
      resultsES: [
        'Supervisión continua de presión en ventanas de acceso 3 y 4 a lo largo de los 19 813 m del túnel.',
        'Alertas automáticas en tiempo real frente al umbral crítico mínimo fijado en 4 m.c.a. (metros de columna de agua).',
        'Prevención de riesgos de despresurización, roturas y efectos de cavitación por regulación de turbinas.',
        'Protección operativa de la infraestructura hidroeléctrica más importante del Perú (COES / Electroperú).',
      ],
      resultsEN: [
        'Continuous pressure monitoring at access windows 3 and 4 along the 19,813 m tunnel.',
        'Real-time automated alarms triggered against the minimum critical threshold set at 4 m.w.c.',
        'Prevention of depressurization, water hammer pipe rupture, and cavitation during turbine regulation.',
        'Comprehensive protection of Peru\'s primary hydroelectric power generation infrastructure.',
      ],
      technologies: ['Sensores de Presión m.c.a.', 'Telemetría en Tiempo Real', 'SCADA / HMI Industrial', 'Modbus TCP / RTU'],
    },
    {
      id: 'caso-6',
      client: 'SEDAPAL',
      categoryId: 'AGUA',
      categoryES: 'Agua Potable y Potabilización IIoT',
      categoryEN: 'Drinking Water & IIoT Potabilization',
      titleES: 'Sistema Predictivo y Dosificación Automática de Cloro (Estanque Regulador IIoT Santa Rosa)',
      titleEN: 'Predictive System & Automatic Chlorine Dosing (IIoT Santa Rosa Regulation Tank)',
      location: 'Estanque Regulador Santa Rosa - SEDAPAL, Lima',
      image: 'assets/slides/sedapal-cloracion-iiot.png',
      icon: 'science',
      accentColor: '#0284c7',
      metricsES: 'Cloro Residual: 1.02 ppm (En Rango) | Predicción Algorítmica a +13h',
      metricsEN: 'Residual Chlorine: 1.02 ppm (In Range) | Predictive AI Model up to +13h',
      summaryES: 'Supervisión del proceso de potabilización de agua en tiempo real mediante control de dosificación de cloro (consigna 6.4 ppm), monitoreo multivariable de agua cruda y modelo predictivo de calidad a 13 horas.',
      summaryEN: 'Real-time water potabilization supervision using automated chlorine dosing (6.4 ppm setpoint), raw water multivariable monitoring, and 13-hour predictive quality modeling.',
      challengeES: 'Garantizar una cloración óptima y constante para consumo humano mitigando variaciones de agua cruda (caudal 6.34 m³/s, turbiedad 49.0 NTU, pH 8.41, ORP 333 mV) considerando el tiempo de tránsito del estanque (13 a 18 horas).',
      challengeEN: 'Guarantee optimal and constant chlorination for human consumption while mitigating raw water variations (flow 6.34 m³/s, turbidity 49.0 NTU, pH 8.41, ORP 333 mV) considering tank retention time (13 to 18 hours).',
      solutionES: 'Implementación de panel industrial HMI Enertronic con monitoreo de entrada (Agua Cruda), bomba de dosificación (Dosis Consigna 6.4 ppm), control de cloro residual en salida (1.02 ppm EN RANGO) y modelo algorítmico predictivo que sugiere dosis óptima (6.6 ppm) y proyecta cloro a +6h y +13h.',
      solutionEN: 'Deployment of Enertronic industrial HMI panel with raw water inlet monitoring, dosing pump control (6.4 ppm setpoint), outlet residual chlorine measurement (1.02 ppm IN RANGE), and predictive AI model suggesting 6.6 ppm optimal dose and projecting +6h and +13h levels.',
      resultsES: [
        'Monitoreo continuo de entrada (Caudal 6.34 m³/s, Turbiedad 49.0 NTU, pH 8.41, ORP 333 mV).',
        'Control preciso de dosificación de cloro a 6.4 ppm y verificación de Cloro Residual en salida (1.02 ppm, en rango seguro de 0.2 a 1.2 ppm).',
        'Modelo algorítmico predictivo que proyecta concentraciones de cloro a +6h y +13h según el tiempo de tránsito (13-18 horas).',
        'Recomendación inteligente de dosis óptima (6.6 ppm) para anticipar variaciones de calidad en la red de distribución.',
      ],
      resultsEN: [
        'Continuous inlet monitoring (Flow rate 6.34 m³/s, Turbidity 49.0 NTU, pH 8.41, ORP 333 mV).',
        'Precise chlorine dosing control at 6.4 ppm and verification of outlet Residual Chlorine (1.02 ppm, safe range 0.2 to 1.2 ppm).',
        'Predictive algorithmic model projecting chlorine concentrations at +6h and +13h based on retention time (13-18 hours).',
        'Smart recommendation of optimal dose (6.6 ppm) to anticipate water quality shifts across the distribution grid.',
      ],
      technologies: ['HMI Industrial', 'Algoritmos Predictivos', 'Dosificación de Cloro', 'Sensores pH / ORP / Turbiedad', 'IIoT Potabilización', 'Control PLC'],
    },
  ];

  public filterCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  public get filteredCaseStudies(): CaseStudy[] {
    const cat = this.selectedCategory();
    if (cat === 'ALL') return this.caseStudies;
    return this.caseStudies.filter((c) => c.categoryId === cat);
  }

  public openModal(study: CaseStudy): void {
    this.selectedStudy.set(study);
  }

  public closeModal(): void {
    this.selectedStudy.set(null);
  }
}
