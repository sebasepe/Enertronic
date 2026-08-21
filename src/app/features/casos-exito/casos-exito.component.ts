import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { LanguageService } from '../../core/services/language.service';

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
      categoryES: 'Agua Potable y Saneamiento',
      categoryEN: 'Water & Sanitation',
      titleES: 'Telemetría Híbrida y Automatización SCADA para Estaciones de Bombeo',
      titleEN: 'Hybrid Telemetry & SCADA Automation for Pumping Stations',
      location: 'Lima, Perú',
      image: 'assets/slides/slide-1.png',
      icon: 'water_drop',
      accentColor: '#0284c7',
      metricsES: '35% Eficiencia Operativa | Reducción de Fallas a < 2 min',
      metricsEN: '35% Operational Efficiency | Failure Time < 2 min',
      summaryES: 'Implementación de un sistema SCADA centralizado con redundancia de transmisión de datos celular 4G y satelital Starlink para 45 estaciones de bombeo de agua en Lima.',
      summaryEN: 'Implementation of a centralized SCADA system with 4G cellular and Starlink satellite redundant telemetry across 45 water pumping stations in Lima.',
      challengeES: 'SEDAPAL requería supervisión en tiempo real e interconexión ininterrumpida en zonas urbanas y periféricas con alta congestión o nula cobertura celular tradicional.',
      challengeEN: 'SEDAPAL required real-time supervision and uninterrupted connectivity across urban and remote sites with high network congestion.',
      solutionES: 'Instalación de gabinetes de telemetría Enertronic con RTU GRD, comunicación híbrida 4G + Starlink, almacenamiento datalogger y software SCADA ciberseguro.',
      solutionEN: 'Deployment of Enertronic telemetry panels with GRD RTUs, 4G + Starlink hybrid comms, local datalogging, and cybersecure SCADA software.',
      resultsES: [
        'Supervisión continua 24/7 de niveles de presión, caudal y estado operacional de bombas.',
        'Detección instantánea de fugas y fluctuaciones críticas de presión.',
        'Reducción del 40% en costos de cuadrillas de inspección manual.',
      ],
      resultsEN: [
        '24/7 continuous supervision of pressure, flow rate, and pump operational status.',
        'Instant detection of leaks and critical pressure fluctuations.',
        '40% reduction in manual field inspection costs.',
      ],
      technologies: ['Software SCADA', 'Starlink Satelital', 'RTU GRD 4G', 'Modbus RTU', 'ISA/IEC 62443'],
    },
    {
      id: 'caso-2',
      client: 'MORKEN PERÚ',
      categoryId: 'OIL_GAS',
      categoryES: 'Oil & Gas e Infraestructura',
      categoryEN: 'Oil & Gas & Infrastructure',
      titleES: 'Supervisión de Ductos e IIoT vía MQTT para Operaciones de Hidrocarburos',
      titleEN: 'Pipeline Supervision & IIoT via MQTT for Oil & Gas Operations',
      location: 'Talara, Piura, Perú',
      image: 'assets/slides/slide-2.png',
      icon: 'local_gas_station',
      accentColor: '#ea580c',
      metricsES: '100% Cobertura de Alertas | Alertas en < 500 ms',
      metricsEN: '100% Alert Coverage | Alerts in < 500 ms',
      summaryES: 'Despliegue de red de telemetría MQTT cibersegura para monitoreo remoto de presión, temperatura y corrosión en tuberías de transporte de combustible.',
      summaryEN: 'Deployment of cybersecure MQTT telemetry network for remote pressure, temperature, and corrosion monitoring in fuel pipelines.',
      challengeES: 'Necesidad de recolectar datos de alta velocidad con consumo de ancho de banda optimizado en tramos distantes sin infraestructura cableada.',
      challengeEN: 'Need for high-speed data acquisition with bandwidth optimization along remote non-cabled pipeline segments.',
      solutionES: 'Integración de transmisores inteligentes con protocolo MQTT industrial, encriptación AES-128 y tableros de control robustecidos IP67.',
      solutionEN: 'Integration of smart transmitters with industrial MQTT protocol, AES-128 encryption, and IP67 ruggedized control panels.',
      resultsES: [
        'Monitoreo en tiempo real con latencia menor a 500 milisegundos.',
        'Ahorro del 80% en tráfico de datos comparado con protocolos tradicionales.',
        'Integración directa con el sistema de control maestro SCADA.',
      ],
      resultsEN: [
        'Real-time monitoring with sub-500ms latency.',
        '80% savings in data bandwidth compared to traditional protocols.',
        'Direct integration with master SCADA control system.',
      ],
      technologies: ['MQTT Industrial', 'RTU 4G', 'Sensores RS-485', 'Datalogger IP67'],
    },
    {
      id: 'caso-3',
      client: 'SENAMHI',
      categoryId: 'METEOROLOGIA',
      categoryES: 'Meteorología e Hidrología',
      categoryEN: 'Meteorology & Hydrology',
      titleES: 'Estaciones Meteorológicas e Hidrológicas Automatizadas en los Andes y Amazonía',
      titleEN: 'Automated Meteorological & Hydrological Stations in Andes & Amazon',
      location: 'Andes y Amazonía, Perú',
      image: 'assets/blog/blog-1.png',
      icon: 'cloud',
      accentColor: '#0891b2',
      metricsES: '99.9% Disponibilidad | Autonomía Solar de 7 Días',
      metricsEN: '99.9% Availability | 7-Day Solar Autonomy',
      summaryES: 'Implementación de estaciones automáticas de medición climática con telemetría satelital Iridium y paneles fotovoltaicos en zonas inhóspitas.',
      summaryEN: 'Deployment of automatic climate measurement stations with Iridium satellite telemetry and solar panels in remote locations.',
      challengeES: 'Transmisión confiable de datos de pluviometría, caudal de ríos y temperatura en zonas andinas y selváticas sin energía eléctrica ni señal telefónica.',
      challengeEN: 'Reliable transmission of rainfall, river flow, and temperature data in isolated mountain and jungle areas without grid power or cellular signal.',
      solutionES: 'Diseño e instalación de estaciones autónomas integrando sensores ultrasónicos de nivel, módem Iridium SBD y baterías de litio LiFePO4 de larga vida útil.',
      solutionEN: 'Design and setup of autonomous stations with ultrasonic level sensors, Iridium SBD modem, and long-life LiFePO4 lithium batteries.',
      resultsES: [
        'Transmisión satelital garantizada ante eventos meteorológicos extremos.',
        'Autonomía operativa continua incluso con 7 días de nubosidad severa.',
        'Emisión de alertas tempranas de desbordes para la prevención de desastres.',
      ],
      resultsEN: [
        'Guaranteed satellite transmission during extreme weather events.',
        'Continuous operational autonomy even under 7 consecutive overcast days.',
        'Early flood warning dispatch for disaster prevention.',
      ],
      technologies: ['Satelital Iridium SBD', 'Baterías Litio LiFePO4', 'Sensores Radar', 'Energía Fotovoltaica'],
    },
    {
      id: 'caso-4',
      client: 'COMPAÑÍA MINERA DEL SUR',
      categoryId: 'MINERIA',
      categoryES: 'Minería e Industria',
      categoryEN: 'Mining & Industry',
      titleES: 'Telemetría Radio Mesh 2.4GHz para Control de Presión y Niveles en Relaves',
      titleEN: '2.4GHz Radio Mesh Telemetry for Tailings Dam Pressure & Level Control',
      location: 'Moquegua, Perú',
      image: 'assets/slides/slide-3.png',
      icon: 'sensors',
      accentColor: '#16a34a',
      metricsES: '0% Pérdida de Paquetes | Cero Cables Estructurados',
      metricsEN: '0% Packet Loss | Zero Structured Cabling',
      summaryES: 'Red inalámbrica multipunto auto-enrutada para monitoreo de 120 sensores en depósito de relaves sin costo de cableado.',
      summaryEN: 'Self-healing multipoint wireless mesh network for monitoring 120 sensors across tailings dam without wiring costs.',
      challengeES: 'Terreno accidentado y distancia de más de 8 km entre pozómetros y la sala de control principal de la mina.',
      challengeEN: 'Rough terrain and distances over 8 km between piezometers and the main mine control room.',
      solutionES: 'Instalación de nodos de telemetría Radio Mesh 2.4GHz autorregenerable que transmiten señales de presión de poros (piezómetros) y nivel ultrasónico.',
      solutionEN: 'Installation of self-healing 2.4GHz Radio Mesh telemetry nodes transmitting pore pressure (piezometer) and ultrasonic level signals.',
      resultsES: [
        'Eliminación total del costo de zanjado y tendido de cableado (ahorro > $80,000 USD).',
        'Conexión ininterrumpida gracias a la reconfiguración automática de rutas de radio mesh.',
        'Integración en tiempo real al SCADA central de la mina.',
      ],
      resultsEN: [
        'Complete elimination of trenching and cabling costs (> $80,000 USD savings).',
        'Uninterrupted connection via automatic mesh radio route reconfiguration.',
        'Real-time integration into central mine SCADA.',
      ],
      technologies: ['Radio Mesh 2.4GHz', 'Piezómetros RS-485', 'Modbus RTU', 'Ciberseguridad AES-128'],
    },
    {
      id: 'caso-5',
      client: 'ELECTROPERÚ',
      categoryId: 'ENERGIA',
      categoryES: 'Generación Eléctrica',
      categoryEN: 'Power Generation',
      titleES: 'Modernización SCADA e HMI para Central Hidroeléctrica',
      titleEN: 'SCADA & HMI Modernization for Hydroelectric Power Plant',
      location: 'Huancavelica, Perú',
      image: 'assets/blog/blog-3.png',
      icon: 'bolt',
      accentColor: '#dc2626',
      metricsES: '40% Reducción de Paradas | Control Centralizado 100%',
      metricsEN: '40% Downtime Reduction | 100% Centralized Control',
      summaryES: 'Actualización del sistema de control y supervisión SCADA de turbinas Pelton y subestación de alta tensión.',
      summaryEN: 'Upgrade of SCADA supervision and control system for Pelton turbines and high-voltage substation.',
      challengeES: 'Obsolescencia de pantallas HMI antiguas y necesidad de integrarlas con protocolos modernos IEC 60870-5-104 y Modbus TCP.',
      challengeEN: 'Obsolescence of legacy HMI screens and requirement to integrate with modern IEC 60870-5-104 and Modbus TCP protocols.',
      solutionES: 'Diseño e integración de paneles HMI táctiles de grado industrial, controladores PLC de alta velocidad y software SCADA redundante.',
      solutionEN: 'Design and integration of industrial touch HMI panels, high-speed PLC controllers, and redundant SCADA software.',
      resultsES: [
        'Disminución del 40% en paradas de planta no programadas.',
        'Generación automática de reportes de eficiencia energética y alarmas críticas.',
        'Cumplimiento con los estándares de operabilidad del COES Perú.',
      ],
      resultsEN: [
        '40% reduction in unscheduled plant shutdowns.',
        'Automated generation of energy efficiency reports and critical alarms.',
        'Full compliance with COES Peru operability standards.',
      ],
      technologies: ['Software SCADA', 'PLC Redundante', 'IEC 60870-5-104', 'Modbus TCP'],
    },
    {
      id: 'caso-6',
      client: 'AGROINDUSTRIAL DEL SUR',
      categoryId: 'AGUA',
      categoryES: 'Agroindustria y Gestión Hídrica',
      categoryEN: 'Agroindustry & Water Management',
      titleES: 'Sistema de Medición de Caudales en Canales de Riego y Telemetría ANA',
      titleEN: 'Flow Measurement System in Irrigation Channels & ANA Telemetry',
      location: 'Ica, Perú',
      image: 'assets/blog/blog-2.png',
      icon: 'speed',
      accentColor: '#9333ea',
      metricsES: '99.5% Precisión de Medición | Cumplimiento ANA 100%',
      metricsEN: '99.5% Measurement Accuracy | 100% ANA Compliance',
      summaryES: 'Medición de flujo en tiempo real mediante sensores ultrasónicos Clamp-On y envío automatizado de reportes a la Autoridad Nacional del Agua.',
      summaryEN: 'Real-time flow measurement using Clamp-On ultrasonic sensors and automated report dispatch to the National Water Authority.',
      challengeES: 'Medición precisa sin interrumpir el flujo de agua en canales de distribución agrícola ni modificar la infraestructura civil existente.',
      challengeEN: 'Accurate flow measurement without interrupting water flow in agricultural distribution channels or altering civil infrastructure.',
      solutionES: 'Instalación de caudalímetros ultrasónicos no invasivos (tiempo de tránsito) acoplados a gabinetes de telemetría cel/satelital Enertronic.',
      solutionEN: 'Installation of non-invasive ultrasonic flowmeters (time of flight) linked to Enertronic cellular/satellite telemetry cabinets.',
      resultsES: [
        'Precisión de aforo hídrico superior al 99.5%.',
        'Automatización total del envío de datos exigidos por la Resolución Jefatural ANA 172-2016.',
        'Control optimizado de dotaciones de riego agrícola.',
      ],
      resultsEN: [
        'Water gauging precision higher than 99.5%.',
        'Total automation of data dispatches mandated by ANA regulations.',
        'Optimized control of agricultural irrigation allocation.',
      ],
      technologies: ['Caudalímetro Ultrasónico', 'Aforos Hídricos', 'Telemetría Celular 4G', 'Reportes ANA'],
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
