import { Injectable, signal } from '@angular/core';

export interface SolutionSpec {
  labelES: string;
  labelEN: string;
  valueES: string;
  valueEN: string;
}

export interface SolutionBenefit {
  icon: string;
  titleES: string;
  titleEN: string;
  descES: string;
  descEN: string;
}

export interface SolutionModel {
  name: string;
  specsES: string;
  specsEN: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  icon: string;
  categoryES: string;
  categoryEN: string;
  titleES: string;
  titleEN: string;
  shortTitleES: string;
  shortTitleEN: string;
  taglineES: string;
  taglineEN: string;
  descES: string;
  descEN: string;
  referentialImage: string;
  imageBadgeES: string;
  imageBadgeEN: string;
  overviewES: string;
  overviewEN: string;
  specs: SolutionSpec[];
  applicationsES: string[];
  applicationsEN: string[];
  benefits: SolutionBenefit[];
  highlightsES: string[];
  highlightsEN: string[];
  models?: SolutionModel[];
}

@Injectable({
  providedIn: 'root',
})
export class SolutionsService {
  private solutions = signal<SolutionItem[]>([
    {
      id: 'sol-1',
      slug: 'telemetria-celular-2g-3g-4g',
      icon: 'cell_tower',
      categoryES: 'TELEMETRÍA CELULAR',
      categoryEN: 'CELLULAR TELEMETRY',
      titleES: 'Solución de Telemetría Celular 2G 3G 4G',
      titleEN: '2G 3G 4G Cellular Telemetry Solution',
      shortTitleES: 'Telemetría Celular 2G 3G 4G',
      shortTitleEN: '2G 3G 4G Cellular Telemetry',
      taglineES: 'Monitoreo remoto de activos industriales con tecnología SMART RTU (GRD) de EXEMYS y comunicación celular multioperador.',
      taglineEN: 'Remote monitoring of industrial assets using EXEMYS SMART RTU (GRD) and multi-operator cellular communication.',
      descES:
        'Dispositivo SMART RTU (GRD) de EXEMYS con módem celular integrado para la captura y transmisión eficiente de datos en tiempo real desde entradas analógicas, digitales, pulsos, PLCs y equipos inteligentes via RS232/RS485 (Modbus RTU).',
      descEN:
        'EXEMYS SMART RTU (GRD) device with integrated cellular modem for real-time capture and transmission from analog, digital, pulse inputs, PLCs, and intelligent equipment via RS232/RS485 (Modbus RTU).',
      referentialImage: 'assets/solutions/telemetria-celular-2g-3g-4g.jpg',
      imageBadgeES: 'SMART RTU GRD Exemys Industrial 4G',
      imageBadgeEN: 'Exemys Industrial 4G SMART RTU GRD',
      overviewES:
        'Esta solución se centra en la unidad SMART RTU (GRD) de EXEMYS. Mediante programación de Scripts internos, el equipo procesa y filtra señales de campo, ejecutando lógicas de control local y transmisiones automáticas a servidores SCADA o plataformas web. Incorpora comunicación celulares 2G/3G/4G multioperador con Failover automático (Claro, Entel, Movistar, Bitel), buffer offline de 100,000 eventos con fechador y capacidad de notificaciones/comandos por SMS a personal autorizado.',
      overviewEN:
        'Centered on EXEMYS SMART RTU (GRD), internal Scripting processes and filters field signals for local control and automated transmission to SCADA servers. Includes multi-operator 2G/3G/4G cellular communication with automatic Failover, 100,000-event offline timestamped buffer, and SMS alerts/commands.',
      highlightsES: [
        'Comunicación Celular 2G/3G/4G con Failover Multioperador automático',
        'Buffer interno para 100,000 eventos con estampado de tiempo',
        'Alertas de umbral y control remoto por comandos SMS',
        'Consumo promedio ultra bajo (<25mA @ 12-24VDC) y configuración remota'
      ],
      highlightsEN: [
        '2G/3G/4G Cellular communication with automatic Multi-operator Failover',
        'Internal timestamped buffer for 100,000 events',
        'Threshold alerts and remote control via SMS commands',
        'Ultra-low average power consumption (<25mA @ 12-24VDC) and remote config'
      ],
      models: [
        {
          name: 'GRD1620-XF-4GA',
          specsES: '1 Puerto RS-485 + 1 Puerto RS-232 (Modbus RTU Master/Slave). Módem 4G LTE.',
          specsEN: '1 RS-485 Port + 1 RS-232 Port (Modbus RTU Master/Slave). 4G LTE Modem.'
        },
        {
          name: 'GRD3625-XF-4GA',
          specsES: '1 RS-485 + 1 RS-232, 4 Entradas Analógicas (0-10V / 4-20mA / 0-1V), 6 I/O Digitales configurables.',
          specsEN: '1 RS-485 + 1 RS-232, 4 Analog Inputs (0-10V / 4-20mA / 0-1V), 6 Configurable Digital I/O.'
        },
        {
          name: 'GRD3534-XF-4GA',
          specsES: '1 RS-485 + 1 RS-232, 8 Entradas Analógicas, 16 Entradas Digitales, 8 Salidas Digitales a Transistor.',
          specsEN: '1 RS-485 + 1 RS-232, 8 Analog Inputs, 16 Digital Inputs, 8 Transistor Digital Outputs.'
        }
      ],
      specs: [
        { labelES: 'Comunicaciones', labelEN: 'Communications', valueES: 'Módem 4G LTE / 3G / 2G Multioperador', valueEN: '4G LTE / 3G / 2G Multi-operator Modem' },
        { labelES: 'Interfaces de Campo', labelEN: 'Field Interfaces', valueES: 'RS232, RS485 (Modbus RTU Master/Slave)', valueEN: 'RS232, RS485 (Modbus RTU Master/Slave)' },
        { labelES: 'Entradas / Salidas', labelEN: 'Inputs / Outputs', valueES: 'Analógicas (4-20mA, 0-10V), Digitales, Pulsos', valueEN: 'Analog (4-20mA, 0-10V), Digital, Pulse' },
        { labelES: 'Almacenamiento Offline', labelEN: 'Offline Buffer', valueES: 'Buffer de 100,000 eventos con fecha y hora', valueEN: '100,000 timestamped events memory buffer' },
        { labelES: 'Alimentación', labelEN: 'Power Supply', valueES: '12 VDC / 24 VDC (Consumo < 25mA)', valueEN: '12 VDC / 24 VDC (Average current < 25mA)' },
        { labelES: 'Integración SCADA', labelEN: 'SCADA Integration', valueES: 'Middleware Modbus TCP/IP, Web Dashboard', valueEN: 'Modbus TCP/IP Middleware, Web Dashboard' }
      ],
      applicationsES: [
        'Monitoreo de estaciones meteorológicas y pluviómetros',
        'Supervisión de estaciones hidrométricas, ríos, lagunas y represas',
        'Monitoreo de piezómetros, inclinómetros y strain gauges',
        'Gestión energética de plantas fotovoltaicas, grupos electrógenos y chillers',
        'Telemedición de caudales en canales abiertos y tuberías'
      ],
      applicationsEN: [
        'Meteorological stations and rain gauge monitoring',
        'Hydrometric stations, rivers, lagoons, and dam supervision',
        'Piezometers, inclinometers, and strain gauges telemetry',
        'Energy management for solar PV plants, diesel generators, and chillers',
        'Flow rate measurement in open canals and pipelines'
      ],
      benefits: [
        { icon: 'cell_tower', titleES: 'Failover Multioperador', titleEN: 'Multi-operator Failover', descES: 'Selección automática entre Claro, Movistar, Entel y Bitel según intensidad de señal.', descEN: 'Automatic selection between mobile carriers based on signal quality.' },
        { icon: 'save', titleES: 'Cero Pérdida de Datos', titleEN: 'Zero Data Loss', descES: 'Buffer de 100,000 eventos que transmite automáticamente al reconectarse la red.', descEN: '100,000-event memory buffer auto-uploading upon reconnection.' },
        { icon: 'sms', titleES: 'Alertas SMS en Tiempo Real', titleEN: 'Real-Time SMS Alerts', descES: 'Notificaciones inmediatas a teléfonos autorizados y comandos remotos por SMS.', descEN: 'Instant notifications to authorized numbers and remote SMS commands.' }
      ]
    },
    {
      id: 'sol-2',
      slug: 'telemetria-satelital-iridium',
      icon: 'satellite_alt',
      categoryES: 'TELEMETRÍA SATELITAL',
      categoryEN: 'SATELLITE TELEMETRY',
      titleES: 'Solución de Telemetría Satelital Iridium',
      titleEN: 'Iridium Satellite Telemetry Solution',
      shortTitleES: 'Telemetría Satelital Iridium',
      shortTitleEN: 'Iridium Satellite Telemetry',
      taglineES: 'Cobertura planetaria 100% garantizada combinando el módem Iridium EDGE SBD con el RTU inteligente GRD de EXEMYS.',
      taglineEN: '100% planetary coverage combining Iridium EDGE SBD satellite modem with EXEMYS GRD smart RTU.',
      descES:
        'Monitoreo eficaz de pequeños volúmenes de datos desde PLCs, sensores y activos remotos transmitidos a intervalos regulares vía tecnología Iridium SBD hacia plataformas web y centros SCADA.',
      descEN:
        'Effective monitoring of small data volumes from PLCs, sensors, and remote assets transmitted regularly via Iridium SBD technology to web platforms and SCADA centers.',
      referentialImage: 'assets/solutions/telemetria-satelital-iridium.jpg',
      imageBadgeES: 'Módem Satelital Iridium EDGE SBD + GRD Exemys',
      imageBadgeEN: 'Iridium EDGE SBD Satellite Modem + Exemys GRD',
      overviewES:
        'Esta solución utiliza la tecnología Iridium Short Burst Data (SBD), optimizada para el envío coste-efectivo de pequeños paquetes de información en ubicaciones sin cobertura celular. Permite acceder a una plataforma web interactiva con dashboards, gráficas de tendencias, registros históricos y notificaciones de alerta por correo electrónico ante eventos anómalos.',
      overviewEN:
        'Utilizing Iridium Short Burst Data (SBD), this solution offers cost-effective transmission of small data packets in remote locations. Features an interactive web platform with dashboards, trend graphs, historical logs, and email notifications.',
      highlightsES: [
        'Cobertura satelital 100% global (incluyendo polos y océanos)',
        'Módem satelital Iridium EDGE IP67 de ultra bajo consumo',
        'Transmisión coste-efectiva de pequeños paquetes de datos (SBD)',
        'Plataforma web con dashboards, gráficas y notificaciones por email'
      ],
      highlightsEN: [
        '100% global satellite coverage (including poles and oceans)',
        'Ultra-low power Iridium EDGE IP67 satellite modem',
        'Cost-effective transmission of small data packets (SBD)',
        'Web platform with dashboards, charts, and email alerts'
      ],
      specs: [
        { labelES: 'Tecnología Satelital', labelEN: 'Satellite Technology', valueES: 'Iridium SBD (Short Burst Data) - Constelación LEO', valueEN: 'Iridium SBD (Short Burst Data) - LEO Constellation' },
        { labelES: 'Cobertura', labelEN: 'Coverage', valueES: '100% Global (Incluye Polos y Océanos)', valueEN: '100% Global (Includes Poles & Oceans)' },
        { labelES: 'Módem Hardware', labelEN: 'Modem Hardware', valueES: 'Iridium EDGE IP67 de Bajo Consumo', valueEN: 'Low Power Iridium EDGE IP67' },
        { labelES: 'Unidad de Telemetría', labelEN: 'Telemetry Unit', valueES: 'SMART RTU GRD Exemys', valueEN: 'Exemys SMART RTU GRD' },
        { labelES: 'Visualización', labelEN: 'Visualization', valueES: 'Plataforma Web, Dashboards, Históricos, Gráficas', valueEN: 'Web Platform, Dashboards, History, Trend Charts' },
        { labelES: 'Alertas', labelEN: 'Alerts', valueES: 'Notificaciones automáticas por correo electrónico', valueEN: 'Automatic email notifications' }
      ],
      applicationsES: [
        'Telemetría de pequeños volúmenes de datos en zonas aisladas',
        'Monitoreo ambiental e hidrológico en alta montaña y selva',
        'Seguimiento y reporte de estado de activos remotos y PLCs',
        'Notificación de alarmas en estaciones sin cobertura móvil'
      ],
      applicationsEN: [
        'Small data volume telemetry in isolated areas',
        'Environmental and hydrological monitoring in high mountains and jungle',
        'Tracking and status reporting for remote assets and PLCs',
        'Alarm notification in off-grid stations'
      ],
      benefits: [
        { icon: 'public', titleES: 'Cobertura 100% Global', titleEN: '100% Global Coverage', descES: 'Conexión continua en cualquier punto geográfico del planeta.', descEN: 'Continuous connectivity anywhere on earth.' },
        { icon: 'attach_money', titleES: 'Transmisión Económica', titleEN: 'Cost-Effective Data', descES: 'Diseñada específicamente para optimizar costos en paquetes de datos reducidos.', descEN: 'Specifically designed to optimize costs for small data packets.' },
        { icon: 'solar_power', titleES: 'Consumo Eléctrico Mínimo', titleEN: 'Minimal Power Draw', descES: 'Ideal para sistemas alimentados por baterías o paneles solares.', descEN: 'Ideal for battery or solar powered remote systems.' }
      ]
    },
    {
      id: 'sol-3',
      slug: 'telemetria-satelital-starlink',
      icon: 'satellite',
      categoryES: 'TELEMETRÍA SATELITAL',
      categoryEN: 'SATELLITE TELEMETRY',
      titleES: 'Solución de Telemetría Satelital STARLINK',
      titleEN: 'STARLINK Satellite Telemetry Solution',
      shortTitleES: 'Telemetría Satelital STARLINK',
      shortTitleEN: 'STARLINK Satellite Telemetry',
      taglineES: 'Conectividad satelital de alta velocidad y baja latencia integrada con SMART RTU (cLAN) Ethernet de EXEMYS.',
      taglineEN: 'High-speed, low-latency satellite connectivity integrated with EXEMYS Ethernet SMART RTU (cLAN).',
      descES:
        'Monitoreo remoto de alto volumen de datos conectando el SMART RTU (cLAN) de EXEMYS vía su puerto Ethernet a la antena STARLINK MINI para transmisión de telemetría y video IP en tiempo real.',
      descEN:
        'High-volume remote data monitoring connecting EXEMYS SMART RTU (cLAN) via Ethernet to STARLINK MINI antenna for real-time telemetry and IP video transmission.',
      referentialImage: 'assets/solutions/telemetria-satelital-starlink.jpg',
      imageBadgeES: 'Terminal Starlink Mini + cLAN Exemys',
      imageBadgeEN: 'Starlink Mini Terminal + Exemys cLAN',
      overviewES:
        'Starlink proporciona banda ancha de alta velocidad (50 a >200 Mbps) y baja latencia gracias a su constelación en órbita baja. Esta solución permite conectar PLCs, sensores y cámaras IP mediante el cLAN de EXEMYS, soportando verificación visual en tiempo real. Los tableros de telemetría se complementan con sistemas fotovoltaicos autónomos de hasta 3 días de autonomía.',
      overviewEN:
        'Starlink provides high-speed broadband (50 to >200 Mbps) and low latency via low-earth orbit satellites. Connects PLCs, sensors, and IP cameras using EXEMYS cLAN for real-time visual confirmation, backed by solar power kits with 3 days of autonomy.',
      highlightsES: [
        'Banda ancha satelital de alta velocidad (50 - 200 Mbps) y baja latencia',
        'Integración de cámaras IP para confirmación visual en tiempo real',
        'Buffer interno para 100,000 eventos con estampado de tiempo',
        'Alimentación fotovoltaica autónoma con hasta 3 días de respaldo'
      ],
      highlightsEN: [
        'High-speed satellite broadband (50 - 200 Mbps) & low latency',
        'IP camera integration for real-time visual event verification',
        'Internal timestamped buffer for 100,000 events',
        'Autonomous solar power kits with up to 3 days battery backup'
      ],
      specs: [
        { labelES: 'Conexión Satelital', labelEN: 'Satellite Link', valueES: 'Starlink Mini / Enterprise (SpaceX LEO)', valueEN: 'Starlink Mini / Enterprise (SpaceX LEO)' },
        { labelES: 'Velocidad de Transmisión', labelEN: 'Transmission Speed', valueES: '50 Mbps a >200 Mbps / Baja Latencia', valueEN: '50 Mbps to >200 Mbps / Low Latency' },
        { labelES: 'RTU Industrial', labelEN: 'Industrial RTU', valueES: 'EXEMYS cLAN Ethernet (Puerto RJ45 10/100)', valueEN: 'EXEMYS cLAN Ethernet (RJ45 10/100 Port)' },
        { labelES: 'Interfaces de Serie', labelEN: 'Serial Interfaces', valueES: 'RS232 / RS485 Modbus RTU', valueEN: 'RS232 / RS485 Modbus RTU' },
        { labelES: 'Soporte Multimedia', labelEN: 'Multimedia Support', valueES: 'Cámaras IP para eventos críticos y streaming', valueEN: 'IP Cameras for critical events & streaming' },
        { labelES: 'Respaldo Solar', labelEN: 'Solar Backup', valueES: 'Sistemas fotovoltaicos autónomos (Autonomía 3 días)', valueEN: 'Autonomous solar systems (3-day autonomy)' }
      ],
      applicationsES: [
        'Monitoreo industrial remoto con alto flujo de datos y video en vivo',
        'Estaciones de telemetría minera y energética sin cobertura terrestre',
        'Supervisión de eventos críticos con confirmación visual por cámara IP',
        'Centros de control SCADA en sitios remotos con respaldo broadband'
      ],
      applicationsEN: [
        'Remote industrial monitoring with high data flow & live video',
        'Mining and energy telemetry stations off the grid',
        'Critical event supervision with IP camera visual confirmation',
        'Remote SCADA control centers with broadband backup'
      ],
      benefits: [
        { icon: 'speed', titleES: 'Banda Ancha Satelital', titleEN: 'Satellite Broadband', descES: 'Transmisión masiva de datos y video IP sin restricciones de ancho de banda.', descEN: 'Massive data and IP video streaming without bandwidth limits.' },
        { icon: 'videocam', titleES: 'Verificación Visual IP', titleEN: 'IP Visual Verification', descES: 'Permite a los operadores validar alarmas e inspeccionar el sitio en vivo.', descEN: 'Enables operators to validate alarms and inspect the site live.' },
        { icon: 'wb_sunny', titleES: 'Autonomía Solar Garantizada', titleEN: 'Guaranteed Solar Autonomy', descES: 'Kits solares dimensionados para operar 3 días continuos en mal clima.', descEN: 'Solar kits sized to operate continuously for 3 days in severe weather.' }
      ]
    },
    {
      id: 'sol-4',
      slug: 'telemetria-radio-mesh-2-4ghz',
      icon: 'rss_feed',
      categoryES: 'REDES INALÁMBRICAS',
      categoryEN: 'WIRELESS NETWORKS',
      titleES: 'Solución de Telemetría Radio Mesh 2.4GHz',
      titleEN: '2.4GHz Mesh Radio Telemetry Solution',
      shortTitleES: 'Telemetría Radio Mesh 2.4GHz',
      shortTitleEN: '2.4GHz Mesh Radio Telemetry',
      taglineES: 'Redes inalámbricas auto-ruteables en banda libre 2.4GHz con la familia de dispositivos wRemote de EXEMYS.',
      taglineEN: 'Self-routing wireless networks in 2.4GHz free band powered by EXEMYS wRemote family.',
      descES:
        'Sistema inalámbrico compuesto por Concentrador y Nodos Remotos para la recolección confiable de datos dispersos en entornos industriales sin costo de cableado.',
      descEN:
        'Wireless system consisting of a Concentrator and Remote Nodes for reliable data collection across industrial sites without cable costs.',
      referentialImage: 'assets/solutions/telemetria-radio-mesh-2-4ghz.jpg',
      imageBadgeES: 'Sistema wRemote Mesh 2.4GHz Exemys',
      imageBadgeEN: 'Exemys wRemote Mesh 2.4GHz System',
      overviewES:
        'La solución wRemote integra tecnología de redes Mesh en 2.4GHz, permitiendo la comunicación directa con transductores y sensores. Los nodos remotos concentran la información de estaciones cercanas y la retransmiten al concentrador y al SMART RTU (GRD) para su envío final a sistemas SCADA Web.',
      overviewEN:
        'The wRemote solution integrates 2.4GHz Mesh technology, connecting directly with sensors. Remote nodes gather data from nearby stations and forward it to the concentrator and SMART RTU (GRD) for transmission to SCADA Web.',
      highlightsES: [
        'Conexión directa de transductores y sensores de medición',
        'Comunicación inalámbrica que elimina 100% el cableado',
        'Topología Mesh con auto-ruteamiento y redundancia de red',
        'Reducción drástica del costo de instalación por punto'
      ],
      highlightsEN: [
        'Direct connection of measurement transducers and sensors',
        'Wireless communication eliminating 100% of cabling',
        'Mesh topology with self-routing and network redundancy',
        'Drastic reduction of installation cost per point'
      ],
      specs: [
        { labelES: 'Frecuencia RF', labelEN: 'RF Frequency', valueES: '2.4 GHz Banda Libre ISM', valueEN: '2.4 GHz License-Free ISM Band' },
        { labelES: 'Tecnología', labelEN: 'Technology', valueES: 'Redes Mesh Inalámbricas Auto-ruteables', valueEN: 'Self-Routing Wireless Mesh Networks' },
        { labelES: 'Arquitectura', labelEN: 'Architecture', valueES: 'Concentrador + Nodos Remotos wRemote', valueEN: 'Concentrator + wRemote Remote Nodes' },
        { labelES: 'Conexión a RTU', labelEN: 'RTU Connection', valueES: 'Integración directa con SMART RTU GRD Exemys', valueEN: 'Direct integration with Exemys SMART RTU GRD' },
        { labelES: 'Envío a SCADA', labelEN: 'SCADA Delivery', valueES: 'Software SCADA Web o Plataforma de Monitoreo', valueEN: 'SCADA Web Software or Monitoring Platform' }
      ],
      applicationsES: [
        'Concentración de datos de sensores dispersos en plantas industriales',
        'Monitoreo inalámbrico de grupos de tanques o estaciones cercanas',
        'Telemetría en áreas donde el cableado es costoso o inviable',
        'Redes de recolección de datos para instrumentación de campo'
      ],
      applicationsEN: [
        'Data concentration from scattered sensors in industrial plants',
        'Wireless monitoring of tank clusters or nearby stations',
        'Telemetry in areas where cabling is expensive or unfeasible',
        'Data collection networks for field instrumentation'
      ],
      benefits: [
        { icon: 'rss_feed', titleES: 'Cero Cableado', titleEN: 'Zero Cabling', descES: 'Elimina el costo de zanjas, tuberías y tendido eléctrico entre sensores.', descEN: 'Eliminates trenching, conduit, and wiring costs between sensors.' },
        { icon: 'hub', titleES: 'Redundancia Mesh', titleEN: 'Mesh Redundancy', descES: 'La red busca caminos alternativos si un nodo intermedio se desconecta.', descEN: 'Reroutes traffic through alternative nodes if one goes offline.' },
        { icon: 'savings', titleES: 'Bajo Costo por Punto', titleEN: 'Low Cost per Point', descES: 'Minimiza la inversión inicial para desplegar múltiples puntos de medición.', descEN: 'Minimizes upfront investment to deploy multiple measurement points.' }
      ]
    },
    {
      id: 'sol-5',
      slug: 'telemetria-mqtt',
      icon: 'swap_calls',
      categoryES: 'IIoT & PROTOCOLOS',
      categoryEN: 'IIoT & PROTOCOLS',
      titleES: 'Solución de Telemetría MQTT',
      titleEN: 'MQTT Telemetry Solution',
      shortTitleES: 'Telemetría MQTT',
      shortTitleEN: 'MQTT Telemetry',
      taglineES: 'Protocolo IIoT Publish/Subscribe integrado en dispositivos EXEMYS con soporte MQTTS (TLS 1.2) y conexión a nubes industriales.',
      taglineEN: 'IIoT Publish/Subscribe protocol integrated into EXEMYS devices with MQTTS (TLS 1.2) support and industrial cloud connectivity.',
      descES:
        'Implementación del protocolo MQTT mediante Scripts en dispositivos GRD-MQ-4G de EXEMYS para comunicación ligera, encriptada y directa con Brokers AWS, Azure, Mosquitto y Kepserver OPC Server.',
      descEN:
        'Implementation of MQTT protocol via Scripts on EXEMYS GRD-MQ-4G devices for lightweight, encrypted, direct communication with AWS, Azure, Mosquitto, and Kepserver OPC Server Brokers.',
      referentialImage: 'assets/solutions/telemetria-mqtt.jpg',
      imageBadgeES: 'Dispositivo EXEMYS GRD-MQ-4G con MQTTS',
      imageBadgeEN: 'EXEMYS GRD-MQ-4G Device with MQTTS',
      overviewES:
        'MQTT es un protocolo liviano optimizado para redes de ancho de banda limitado en entornos IIoT. Los equipos EXEMYS GRD-MQ-4G funcionan como nodos MQTT nativos conectándose directamente al Broker via red celular. Soporta encriptación MQTTS (TLS 1.2 con certificados), pruebas de interoperabilidad verificadas con AWS IoT y Microsoft Azure, e integración directa con Kepserver OPC Server.',
      overviewEN:
        'MQTT is a lightweight protocol optimized for bandwidth-limited IIoT networks. EXEMYS GRD-MQ-4G units act as native MQTT nodes connecting directly to the Broker via cellular. Supports MQTTS (TLS 1.2 with certs), verified interoperability with AWS IoT and Azure, and Kepserver OPC integration.',
      highlightsES: [
        'Nodo MQTT nativo conectado directo al Broker por red Celular 4G',
        'Conexiones MQTTS encriptadas con certificados TLS 1.2',
        'Interoperabilidad probada con AWS IoT, Microsoft Azure y Kepserver OPC',
        'Lógica interna por Scripts con comandos SMS y buffer de eventos'
      ],
      highlightsEN: [
        'Native MQTT node connecting directly to Broker over 4G Cellular',
        'MQTTS encrypted connections using TLS 1.2 certificates',
        'Tested interoperability with AWS IoT, Microsoft Azure & Kepserver OPC',
        'Internal Script logic with SMS commands and event buffer'
      ],
      models: [
        {
          name: 'GRD3625-MQ-4GA',
          specsES: '2 RS232/RS485 Modbus RTU, 6 Entradas Digitales/Pulsos (45Hz), 4 Entradas Analógicas (0-10V / 4-20mA).',
          specsEN: '2 RS232/RS485 Modbus RTU, 6 Digital/Pulse Inputs (45Hz), 4 Analog Inputs (0-10V / 4-20mA).'
        },
        {
          name: 'GRD3534-MQ-4GA',
          specsES: '2 RS232/RS485 Modbus RTU, 16 Entradas Digitales, 8 Salidas Digitales, 8 DI Pulsos (1kHz), 8 Entradas Analógicas.',
          specsEN: '2 RS232/RS485 Modbus RTU, 16 Digital Inputs, 8 Digital Outputs, 8 DI Pulse (1kHz), 8 Analog Inputs.'
        }
      ],
      specs: [
        { labelES: 'Protocolo de Red', labelEN: 'Network Protocol', valueES: 'MQTT / MQTTS sobre Celular 4G LTE', valueEN: 'MQTT / MQTTS over 4G LTE Cellular' },
        { labelES: 'Seguridad', labelEN: 'Security', valueES: 'Encriptación TLS 1.2 con Certificados X.509', valueEN: 'TLS 1.2 Encryption with X.509 Certificates' },
        { labelES: 'Compatibilidad Nube', labelEN: 'Cloud Compatibility', valueES: 'AWS IoT, Microsoft Azure, Mosquitto Broker', valueEN: 'AWS IoT, Microsoft Azure, Mosquitto Broker' },
        { labelES: 'Driver OPC', labelEN: 'OPC Driver', valueES: 'Compatible con Kepserver OPC Server (Driver MQTT)', valueEN: 'Compatible with Kepserver OPC Server (MQTT Driver)' },
        { labelES: 'Funcionalidad', labelEN: 'Functionality', valueES: 'Modbus Esclavo, Cliente MQTT, Scripts, SMS Alertas', valueEN: 'Modbus Slave, MQTT Client, Scripts, SMS Alerts' },
        { labelES: 'Actualización', labelEN: 'Updates', valueES: 'Actualización de Firmware por Aire (FOTA)', valueEN: 'Firmware Over The Air (FOTA) updates' }
      ],
      applicationsES: [
        'Conexión directa de datos industriales hacia naves AWS IoT y Azure',
        'Integración a SCADA mediante OPC Server Kepserver con driver MQTT',
        'Monitoreo remoto de variables con consumo de datos mínimo',
        'Control y gestión de salidas por suscripción a tópicos MQTT'
      ],
      applicationsEN: [
        'Direct industrial data connection to AWS IoT and Azure clouds',
        'SCADA integration via Kepserver OPC Server with MQTT driver',
        'Remote variable monitoring with minimal data consumption',
        'Output control and management via MQTT topic subscriptions'
      ],
      benefits: [
        { icon: 'cloud_done', titleES: 'Integración Cloud Nativa', titleEN: 'Native Cloud Integration', descES: 'Conexión directa con AWS y Azure sin necesidad de gateways adicionales.', descEN: 'Direct connection to AWS and Azure without extra gateways.' },
        { icon: 'lock', titleES: 'Encriptación MQTTS', titleEN: 'MQTTS Encryption', descES: 'Capa de seguridad TLS 1.2 con certificados para proteger datos sensibles.', descEN: 'TLS 1.2 security layer with certificates protecting sensitive data.' },
        { icon: 'memory', titleES: 'Scripts Programables', titleEN: 'Programmable Scripts', descES: 'Ejecuta operaciones matemáticas, temporizadores y lógica local en el equipo.', descEN: 'Executes math, timers, and local logic directly on the device.' }
      ]
    },
    {
      id: 'sol-6',
      slug: 'telemetria-ethernet',
      icon: 'lan',
      categoryES: 'CONECTIVIDAD INDUSTRIAL',
      categoryEN: 'INDUSTRIAL CONNECTIVITY',
      titleES: 'Solución de Telemetría Ethernet',
      titleEN: 'Ethernet Telemetry Solution',
      shortTitleES: 'Telemetría Ethernet',
      shortTitleEN: 'Ethernet Telemetry',
      taglineES: 'Supervisión y control remoto IIoT con la serie cLAN-XF de EXEMYS vía puerto Ethernet 10/100 Mbps y RS232/RS485.',
      taglineEN: 'IIoT remote supervision and control using EXEMYS cLAN-XF series over 10/100 Mbps Ethernet & RS232/RS485.',
      descES:
        'Dispositivos cLAN-XF de EXEMYS para supervisar y controlar remotamente sensores, transductores y PLCs a través de redes Ethernet/WiFi con protocolo Modbus TCP, SNMP, FTP y Scripts.',
      descEN:
        'EXEMYS cLAN-XF devices for remote supervision and control of sensors, transducers, and PLCs over Ethernet/WiFi networks with Modbus TCP, SNMP, FTP, and Scripts.',
      referentialImage: 'assets/solutions/telemetria-ethernet.jpg',
      imageBadgeES: 'Módem cLAN-XF Ethernet Exemys',
      imageBadgeEN: 'Exemys cLAN-XF Ethernet Modem',
      overviewES:
        'La serie cLAN-XF permite conectar instrumental de campo a redes Ethernet corporativas. Funciona como Esclavo Modbus Serial/TCP, Maestro Modbus para expansión de I/O, e integra protocolos industriales avanzados como SNMP V1 (traps), NMEA 0183, MetPak, cliente FTP y conversores de protocolo Modbus a SNMP/TCP.',
      overviewEN:
        'The cLAN-XF series connects field instrumentation to corporate Ethernet networks. Acts as Modbus Serial/TCP Slave, Modbus Master for I/O expansion, and integrates SNMP V1, NMEA 0183, MetPak, FTP client, and Modbus to SNMP/TCP converters.',
      highlightsES: [
        'Esclavo y Maestro Modbus Serial / TCP para conexión directa a SCADA',
        'Protocolo SNMP V1 con envío de Traps y Cliente FTP para subir registros',
        'Conversores Modbus RTU/ASCII a Modbus TCP y SNMP',
        'Reconexión automática ante cortes de enlace Ethernet'
      ],
      highlightsEN: [
        'Modbus Serial / TCP Slave and Master for direct SCADA connection',
        'SNMP V1 protocol with Traps & FTP Client for log uploading',
        'Modbus RTU/ASCII to Modbus TCP and SNMP converters',
        'Automatic reconnection upon Ethernet link interruption'
      ],
      models: [
        {
          name: 'cLAN-1520-XF',
          specsES: '1 Puerto Ethernet 10/100 Mbps y 2 Puertos Seriales RS232/RS485.',
          specsEN: '1 Ethernet Port 10/100 Mbps and 2 RS232/RS485 Serial Ports.'
        },
        {
          name: 'cLAN-3524-XF',
          specsES: '1 Puerto Ethernet 10/100 Mbps, 2 Puertos Seriales, 8 Entradas Analógicas, 16 Entradas Digitales, 8 Salidas Digitales, Lógica de Scripts.',
          specsEN: '1 Ethernet Port 10/100 Mbps, 2 Serial Ports, 8 Analog Inputs, 16 Digital Inputs, 8 Digital Outputs, Scripting Logic.'
        }
      ],
      specs: [
        { labelES: 'Puerto Ethernet', labelEN: 'Ethernet Port', valueES: '10/100 Mbps Auto-MDIX RJ45', valueEN: '10/100 Mbps Auto-MDIX RJ45' },
        { labelES: 'Interfaces Seriales', labelEN: 'Serial Interfaces', valueES: 'RS232 / RS485 aisladas', valueEN: 'Isolated RS232 / RS485' },
        { labelES: 'Protocolos de Red', labelEN: 'Network Protocols', valueES: 'Modbus TCP, SNMP V1 (Traps), FTP, NMEA 0183', valueEN: 'Modbus TCP, SNMP V1 (Traps), FTP, NMEA 0183' },
        { labelES: 'Entradas / Salidas', labelEN: 'Inputs / Outputs', valueES: 'Analógicas (0-10V/4-20mA), Digitales, Pulsos', valueEN: 'Analog (0-10V/4-20mA), Digital, Pulse' },
        { labelES: 'Conversores', labelEN: 'Converters', valueES: 'Modbus RTU/ASCII a Modbus TCP y SNMP', valueEN: 'Modbus RTU/ASCII to Modbus TCP and SNMP' },
        { labelES: 'Programación', labelEN: 'Programming', valueES: 'Lógica por Scripts (Operaciones matemáticas, Timers)', valueEN: 'Script logic (Math operations, Timers)' }
      ],
      applicationsES: [
        'Supervisión de sensores y transductores en plantas con red Ethernet',
        'Integración de equipos meteorológicos MetPak y NMEA 0183 a SCADA',
        'Envío automático de registros a servidores mediante Cliente FTP',
        'Conversión de tableros Modbus RTU existentes a SNMP / Modbus TCP'
      ],
      applicationsEN: [
        'Sensors and transducers supervision in plants with Ethernet network',
        'MetPak and NMEA 0183 weather equipment integration to SCADA',
        'Automatic log uploading to servers via FTP Client',
        'Conversion of legacy Modbus RTU panels to SNMP / Modbus TCP'
      ],
      benefits: [
        { icon: 'lan', titleES: 'Integración LAN Directa', titleEN: 'Direct LAN Integration', descES: 'Conecta instrumentación de campo directamente a la red Ethernet de planta.', descEN: 'Connects field instrumentation directly to the plant Ethernet network.' },
        { icon: 'transform', titleES: 'Conversores Múltiples', titleEN: 'Multiple Converters', descES: 'Transforma tráfico Modbus RTU/ASCII a SNMP y Modbus TCP transparente.', descEN: 'Converts Modbus RTU/ASCII to SNMP and transparent Modbus TCP.' },
        { icon: 'sync', titleES: 'Reconexión Automática', titleEN: 'Auto Reconnection', descES: 'Restablece automáticamente la sesión de red ante cualquier interrupción.', descEN: 'Automatically restores network session upon any disruption.' }
      ]
    },
    {
      id: 'sol-7',
      slug: 'telemetria-wifi',
      icon: 'wifi',
      categoryES: 'CONECTIVIDAD INALÁMBRICA',
      categoryEN: 'WIRELESS CONNECTIVITY',
      titleES: 'Solución de Telemetría WIFI',
      titleEN: 'WiFi Telemetry Solution',
      shortTitleES: 'Telemetría WIFI',
      shortTitleEN: 'WiFi Telemetry',
      taglineES: 'Monitoreo en tiempo real de estaciones remotas, medidores de energía, PLCs y sensores sobre redes WiFi/Celulares.',
      taglineEN: 'Real-time monitoring of remote stations, power meters, PLCs, and sensors over WiFi/Cellular networks.',
      descES:
        'SMART RTU con comunicación WiFi y Celular para adquisición de datos en tiempo real de fuentes Modbus RTU (RS232/RS485) y Modbus TCP por Ethernet con buffer offline de 100,000 eventos.',
      descEN:
        'SMART RTU with WiFi and Cellular communication for real-time data acquisition from Modbus RTU (RS232/RS485) and Modbus TCP sources with a 100,000-event offline buffer.',
      referentialImage: 'assets/solutions/telemetria-wifi.jpg',
      imageBadgeES: 'SMART RTU WiFi Industrial Exemys',
      imageBadgeEN: 'Exemys Industrial WiFi SMART RTU',
      overviewES:
        'Esta solución permite conectar sensores, transductores, medidores de energía, PLCs y dataloggers mediante protocolos Modbus RTU (RS232/RS485) y Modbus TCP. El SMART RTU dispone de lógica de control programable para automatismos locales, envío de alertas/comandos SMS y un buffer de 100,000 eventos para resguardar la información durante caídas de red.',
      overviewEN:
        'Connects sensors, transducers, power meters, PLCs, and dataloggers using Modbus RTU (RS232/RS485) and Modbus TCP. Features programmable control logic for local automation, SMS alerts/commands, and a 100,000-event buffer protecting data during network outages.',
      highlightsES: [
        'Monitoreo en tiempo real de PLCs, Dataloggers y medidores de energía',
        'Lógica de control local para automatismos y gestión de históricos',
        'Buffer interno para 100,000 eventos con retransmisión automática',
        'Alertas de umbral y comandos por SMS a celulares autorizados'
      ],
      highlightsEN: [
        'Real-time monitoring of PLCs, Dataloggers, and power meters',
        'Local control logic for automation and historical data management',
        'Internal 100,000-event buffer with automatic retransmission',
        'Threshold alerts and SMS commands to authorized phones'
      ],
      specs: [
        { labelES: 'Comunicación', labelEN: 'Communication', valueES: 'WiFi 802.11 b/g/n / Red Celular', valueEN: 'WiFi 802.11 b/g/n / Cellular Network' },
        { labelES: 'Protocolos Soportados', labelEN: 'Supported Protocols', valueES: 'Modbus RTU (RS232/RS485), Modbus TCP Ethernet', valueEN: 'Modbus RTU (RS232/RS485), Modbus TCP Ethernet' },
        { labelES: 'Lógica Local', labelEN: 'Local Logic', valueES: 'Programación de Scripts de control y automatización', valueEN: 'Scripting programming for control and automation' },
        { labelES: 'Memoria de Eventos', labelEN: 'Event Buffer', valueES: '100,000 eventos fechados en memoria no volátil', valueEN: '100,000 timestamped events in non-volatile memory' },
        { labelES: 'Gestión de Alertas', labelEN: 'Alert Management', valueES: 'Alertas SMS, Comandos SMS, SCADA Web', valueEN: 'SMS Alerts, SMS Commands, SCADA Web' }
      ],
      applicationsES: [
        'Monitoreo de medidores de energía y parámetros eléctricos',
        'Supervisión sin cables de activos industriales y PLCs en planta',
        'Telemetría de estaciones remotas con conectividad WiFi/Celular',
        'Control local automático y almacenamiento de históricos en campo'
      ],
      applicationsEN: [
        'Power meter and electrical parameter monitoring',
        'Wireless supervision of industrial assets and PLCs in plant',
        'Remote station telemetry with WiFi/Cellular connectivity',
        'Local automatic control and historical log storage in field'
      ],
      benefits: [
        { icon: 'wifi', titleES: 'Conectividad WiFi/Celular', titleEN: 'WiFi/Cellular Connectivity', descES: 'Combina redes locales de planta con respaldo celular para máxima disponibilidad.', descEN: 'Combines local plant WiFi with cellular backup for maximum uptime.' },
        { icon: 'save', titleES: 'Buffer de 100,000 Eventos', titleEN: '100,000 Event Buffer', descES: 'Mantiene intactos los datos durante caídas de servicio y los envía al reconectarse.', descEN: 'Keeps data intact during service drops and uploads upon reconnection.' },
        { icon: 'settings', titleES: 'Control Local Inteligente', titleEN: 'Smart Local Control', descES: 'Ejecuta automatismos locales mediante Scripts sin depender del servidor.', descEN: 'Executes local automations via Scripts independently of the server.' }
      ]
    },
    {
      id: 'sol-8',
      slug: 'satelital-inmarsat-bgan-m2m',
      icon: 'public',
      categoryES: 'TELEMETRÍA SATELITAL',
      categoryEN: 'SATELLITE TELEMETRY',
      titleES: 'Solución de telemetría satelital inmarsat BGAN M2M',
      titleEN: 'Inmarsat BGAN M2M Satellite Telemetry Solution',
      shortTitleES: 'Satelital Inmarsat BGAN M2M',
      shortTitleEN: 'Inmarsat BGAN M2M Satellite',
      taglineES: 'Enlace IP satelital global ininterrumpido (Always-on) para estaciones remotas y procesos críticos.',
      taglineEN: 'Uninterrupted global satellite IP link (Always-on) for remote stations and critical processes.',
      descES:
        'Monitoreo satelital en tiempo real de estaciones y activos industriales aislados mediante el servicio Inmarsat BGAN M2M, integrando Modbus RTU/TCP, buffer de 100,000 eventos y lógica de control.',
      descEN:
        'Real-time satellite monitoring of remote stations and isolated industrial assets via Inmarsat BGAN M2M, integrating Modbus RTU/TCP, 100,000-event buffer, and control logic.',
      referentialImage: 'assets/solutions/telemetria-satelital-inmarsat-bgan-m2m.jpg',
      imageBadgeES: 'Terminal Satelital Inmarsat BGAN M2M',
      imageBadgeEN: 'Inmarsat BGAN M2M Satellite Terminal',
      overviewES:
        'Inmarsat BGAN M2M ofrece una conexión IP satelital dedicada de alta confiabilidad en cualquier ubicación geográfica. El SMART RTU procesa datos de sensores, PLCs y medidores (RS232/RS485/Ethernet), gestiona históricos y alertas, y garantiza cero pérdidas de información gracias a su buffer interno de 100,000 eventos.',
      overviewEN:
        'Inmarsat BGAN M2M provides a highly reliable dedicated satellite IP connection anywhere. SMART RTU processes data from sensors, PLCs, and meters (RS232/RS485/Ethernet), manages history and alerts, and ensures zero data loss via its 100,000-event buffer.',
      highlightsES: [
        'Conexión IP satelital ininterrumpida (Always-on IP Broadband)',
        'Buffer interno para 100,000 eventos ante pérdidas temporales de enlace',
        'Compatibilidad nativa con Modbus RTU (RS232/485) y Modbus TCP',
        'Lógica de control local por Scripts y notificaciones de alerta'
      ],
      highlightsEN: [
        'Uninterrupted satellite IP connection (Always-on IP Broadband)',
        'Internal 100,000-event buffer protecting against link loss',
        'Native compatibility with Modbus RTU (RS232/485) and Modbus TCP',
        'Local control logic via Scripts and alert notifications'
      ],
      specs: [
        { labelES: 'Red Satelital', labelEN: 'Satellite Network', valueES: 'Inmarsat BGAN M2M (GEO Constellation)', valueEN: 'Inmarsat BGAN M2M (GEO Constellation)' },
        { labelES: 'Modo de Conexión', labelEN: 'Connection Mode', valueES: 'IP Banda Ancha Continua (Always-on IP)', valueEN: 'Continuous IP Broadband (Always-on IP)' },
        { labelES: 'Interfaces de Campo', labelEN: 'Field Interfaces', valueES: 'RS232, RS485 Modbus RTU, Ethernet Modbus TCP', valueEN: 'RS232, RS485 Modbus RTU, Ethernet Modbus TCP' },
        { labelES: 'Memoria de Respaldo', labelEN: 'Backup Memory', valueES: '100,000 eventos fechados en buffer no volátil', valueEN: '100,000 timestamped events in non-volatile buffer' },
        { labelES: 'Integración SCADA', labelEN: 'SCADA Integration', valueES: 'Plataforma Web, Sistemas SCADA centrales', valueEN: 'Web Platform, Central SCADA Systems' }
      ],
      applicationsES: [
        'Telemetría de estaciones remotas de alta criticidad sin red celular',
        'Supervisión de válvulas en ductos de hidrocarburos y minería',
        'Monitoreo continuo de parámetros ambientales e hidrológicos',
        'Sistemas SCADA de respaldo para subestaciones y tuberías'
      ],
      applicationsEN: [
        'Telemetry for high-criticality remote stations off the cell grid',
        'Valve supervision in hydrocarbon and mining pipelines',
        'Continuous environmental and hydrological parameter monitoring',
        'Backup SCADA systems for substations and pipelines'
      ],
      benefits: [
        { icon: 'public', titleES: 'Enlace IP Dedicado Global', titleEN: 'Global Dedicated IP Link', descES: 'Conexión IP permanente para monitoreo SCADA en tiempo real en todo el mundo.', descEN: 'Permanent IP connection for real-time SCADA monitoring worldwide.' },
        { icon: 'shield', titleES: 'Resistencia y Respaldo', titleEN: 'Durability & Backup', descES: 'Almacena hasta 100,000 eventos locales para transmitir al restablecer la red.', descEN: 'Stores up to 100,000 local events to upload when network restores.' },
        { icon: 'verified', titleES: 'Compatibilidad Industrial', titleEN: 'Industrial Compatibility', descES: 'Soporta protocolos estándar Modbus RTU/TCP para PLCs y sensores.', descEN: 'Supports standard Modbus RTU/TCP protocols for PLCs and sensors.' }
      ]
    },
    {
      id: 'sol-9',
      slug: 'telemetria-lorawan',
      icon: 'sensors',
      categoryES: 'REDES IoT LPWAN',
      categoryEN: 'LPWAN IoT NETWORKS',
      titleES: 'Solución de Telemetría LoRaWAN',
      titleEN: 'LoRaWAN Telemetry Solution',
      shortTitleES: 'Telemetría LoRaWAN',
      shortTitleEN: 'LoRaWAN Telemetry',
      taglineES: 'Redes inalámbricas de gran alcance y bajo consumo con dispositivos wRemote-LoRa y el Lorificador® Exemys.',
      taglineEN: 'Long-range, low-power wireless networks using wRemote-LoRa devices and Exemys Lorificador®.',
      descES:
        'Dispositivo wRemote-LoRa y Lorificador® de EXEMYS para convertir entradas analógicas (0-10V/4-20mA), digitales y registros Modbus RTU a redes LoRaWAN en bandas libres (AU915/US915).',
      descEN:
        'EXEMYS wRemote-LoRa device and Lorificador® to convert analog (0-10V/4-20mA), digital inputs, and Modbus RTU registers to LoRaWAN networks on free bands (AU915/US915).',
      referentialImage: 'assets/solutions/telemetria-lorawan.jpg',
      imageBadgeES: 'Dispositivo wRemote-LoRa / Lorificador® Exemys',
      imageBadgeEN: 'Exemys wRemote-LoRa Device / Lorificador®',
      overviewES:
        'LoRaWAN es un protocolo de red inalámbrica que opera en frecuencias no licenciadas, ideal para transmisión a gran distancia con consumo energético mínimo. El equipo wRemote-LoRa y el Lorificador® de EXEMYS adaptan la instrumentación industrial (entradas DI/AI y RS232/RS485 Modbus) a la red LoRaWAN de forma sencilla mediante un puerto USB de configuración.',
      overviewEN:
        'LoRaWAN is an unlicensed wireless network protocol for long-range data transmission with minimal power consumption. EXEMYS wRemote-LoRa and Lorificador® adapt industrial instruments (DI/AI and RS232/RS485 Modbus) to LoRaWAN via USB configuration.',
      highlightsES: [
        'Lorificador® Exemys: Convierte DI/AI y registros Modbus RTU a LoRaWAN',
        'Operación en bandas libres AU915 (Sudamérica) y US915',
        'Robustez industrial y comunicación de largo alcance con bajo consumo',
        'Puerto USB dedicado para configuración rápida y sencilla'
      ],
      highlightsEN: [
        'Exemys Lorificador®: Converts DI/AI and Modbus RTU registers to LoRaWAN',
        'Free band operation AU915 (South America) and US915',
        'Industrial robustness and long-range communication with low power',
        'Dedicated USB port for fast and easy setup'
      ],
      models: [
        {
          name: 'wRemote-3005-LoRa-AU',
          specsES: 'Banda Australia (AU915). Función Nodo. RS232/RS485 Modbus RTU, 4 Entradas Analógicas (0-10V/4-20mA), 4 Entradas Digitales.',
          specsEN: 'Australia Band (AU915). Node Function. RS232/RS485 Modbus RTU, 4 Analog Inputs (0-10V/4-20mA), 4 Digital Inputs.'
        },
        {
          name: 'wRemote-3005-LoRa-US',
          specsES: 'Banda Americana (US915). Función Nodo. RS232/RS485 Modbus RTU, 4 Entradas Analógicas (0-10V/4-20mA), 4 Entradas Digitales.',
          specsEN: 'Americana Band (US915). Node Function. RS232/RS485 Modbus RTU, 4 Analog Inputs (0-10V/4-20mA), 4 Digital Inputs.'
        }
      ],
      specs: [
        { labelES: 'Protocolo Inalámbrico', labelEN: 'Wireless Protocol', valueES: 'LoRaWAN Standard (Bandas AU915 / US915)', valueEN: 'LoRaWAN Standard (AU915 / US915 Bands)' },
        { labelES: 'Dispositivos', labelEN: 'Devices', valueES: 'wRemote-LoRa + Lorificador® Exemys', valueEN: 'wRemote-LoRa + Exemys Lorificador®' },
        { labelES: 'Entradas Analógicas', labelEN: 'Analog Inputs', valueES: '4x Configurables por Software (0-10V / 4-20mA)', valueEN: '4x Software Configurable (0-10V / 4-20mA)' },
        { labelES: 'Entradas Digitales', labelEN: 'Digital Inputs', valueES: '4 Entradas Digitales aisladas', valueEN: '4 Isolated Digital Inputs' },
        { labelES: 'Puerto Serial', labelEN: 'Serial Port', valueES: 'RS232 / RS485 Modbus RTU', valueEN: 'RS232 / RS485 Modbus RTU' },
        { labelES: 'Configuración', labelEN: 'Configuration', valueES: 'Puerto Micro-USB para parametrización rápida', valueEN: 'Micro-USB port for rapid parameterization' }
      ],
      applicationsES: [
        'Conversión de señales analógicas y Modbus a redes privadas LoRaWAN',
        'Telemetría en campo abierto e instalaciones industriales extensas',
        'Monitoreo de sensores de nivel, presión y temperatura de bajo consumo',
        'Recolección de datos en áreas sin cobertura celular ni energía de red'
      ],
      applicationsEN: [
        'Conversion of analog and Modbus signals to private LoRaWAN networks',
        'Open field telemetry and extensive industrial plants',
        'Low-power level, pressure, and temperature sensor monitoring',
        'Data collection in off-grid areas without cellular coverage'
      ],
      benefits: [
        { icon: 'sensors', titleES: 'Lorificador® Innovador', titleEN: 'Innovative Lorificador®', descES: 'Dispositivo exclusivo Exemys que integra señales Modbus y analógicas a LoRaWAN.', descEN: 'Exclusive Exemys device integrating Modbus and analog signals into LoRaWAN.' },
        { icon: 'battery_saving', titleES: 'Bajo Consumo de Energía', titleEN: 'Low Power Draw', descES: 'Optimizado para funcionar durante largos periodos con batería o panel solar pequeño.', descEN: 'Optimized for long-term battery or small solar panel operation.' },
        { icon: 'tune', titleES: 'Configuración USB Fácil', titleEN: 'Easy USB Setup', descES: 'Puerto USB para parametrización local rápida sin complicaciones.', descEN: 'USB port for quick, straightforward local parameterization.' }
      ]
    },
    {
      id: 'sol-10',
      slug: 'tunel-inalambrico-2-4ghz',
      icon: 'transform',
      categoryES: 'TÚNELES INALÁMBRICOS',
      categoryEN: 'WIRELESS TUNNELS',
      titleES: 'Túnel inalámbrico 2.4GHz',
      titleEN: '2.4GHz Wireless Tunnel',
      shortTitleES: 'Túnel Inalámbrico 2.4GHz',
      shortTitleEN: '2.4GHz Wireless Tunnel',
      taglineES: 'Réplica transparente punto a punto de entradas, salidas y puertos seriales via radio ZigBee 2.4GHz con wTunnel de EXEMYS.',
      taglineEN: 'Point-to-point transparent replication of inputs, outputs, and serial ports over 2.4GHz ZigBee radio with EXEMYS wTunnel.',
      descES:
        'Dispositivo wTunnel de EXEMYS para reflejar inalámbricamente las entradas de un equipo como salidas en otro, además de replicar puertos seriales RS232/RS485 o USB sin cables ni PLC.',
      descEN:
        'EXEMYS wTunnel device to wirelessly mirror inputs from one unit as outputs on another, replicating RS232/RS485 or USB serial ports without wires or PLCs.',
      referentialImage: 'assets/solutions/tunel-inalambrico-2-4ghz.jpg',
      imageBadgeES: 'Sistema wTunnel Exemys Transmisor/Receptor',
      imageBadgeEN: 'Exemys wTunnel Transmitter/Receiver System',
      overviewES:
        'wTunnel actúa como un túnel inalámbrico punto a punto utilizando tecnología radio ZigBee 2.4GHz. Refleja las condiciones de entradas digitales o analógicas del transmisor directamente en las salidas del receptor a distancia, ofreciendo además una extensión transparente para enlaces seriales RS232/RS485 o USB con fiabilidad y bajo costo.',
      overviewEN:
        'wTunnel acts as a point-to-point wireless tunnel using 2.4GHz ZigBee radio. Mirrors transmitter digital/analog inputs straight to receiver outputs over distance, offering a transparent extension for RS232/RS485 or USB serial links with high reliability and low cost.',
      highlightsES: [
        'Replicación transparente de entradas de campo como salidas en el receptor',
        'Túnel serial punto a punto RS232 / RS485 o USB por radio 2.4GHz',
        'Tecnología ZigBee de alta conectividad y estabilidad',
        'Eliminación total de cableado físico de control entre puntos'
      ],
      highlightsEN: [
        'Transparent field input replication as receiver outputs',
        'Point-to-point RS232 / RS485 or USB serial tunnel over 2.4GHz radio',
        'High connectivity and stability ZigBee technology',
        'Complete elimination of physical control wiring between points'
      ],
      models: [
        {
          name: 'wTunnel-2002',
          specsES: 'Túnel inalámbrico ZigBee 2.4GHz. Réplica punto a punto de señales I/O.',
          specsEN: 'ZigBee 2.4GHz wireless tunnel. Point-to-point I/O signal replication.'
        },
        {
          name: 'wTunnel-3001',
          specsES: 'Túnel inalámbrico ZigBee 2.4GHz con réplica de puertos seriales RS232/RS485.',
          specsEN: 'ZigBee 2.4GHz wireless tunnel with RS232/RS485 serial port replication.'
        },
        {
          name: 'wTunnel-5003',
          specsES: 'Túnel inalámbrico ZigBee 2.4GHz para réplica avanzada de I/O y datos seriales.',
          specsEN: 'ZigBee 2.4GHz wireless tunnel for advanced I/O and serial data replication.'
        }
      ],
      specs: [
        { labelES: 'Frecuencia Radio', labelEN: 'Radio Frequency', valueES: '2.4 GHz ISM Band (Tecnología ZigBee)', valueEN: '2.4 GHz ISM Band (ZigBee Technology)' },
        { labelES: 'Modo de Operación', labelEN: 'Operating Mode', valueES: 'Túnel punto a punto (Transmisor -> Receptor)', valueEN: 'Point-to-point tunnel (Transmitter -> Receiver)' },
        { labelES: 'Réplica de Señal', labelEN: 'Signal Replication', valueES: 'Entradas DI/AI reflejadas como Salidas DO/AO', valueEN: 'DI/AI inputs mirrored as DO/AO outputs' },
        { labelES: 'Túnel Serial', labelEN: 'Serial Tunnel', valueES: 'Replicación de puertos RS232 / RS485 / USB', valueEN: 'RS232 / RS485 / USB port replication' },
        { labelES: 'Modelos Disponibles', labelEN: 'Available Models', valueES: 'wTunnel-2002, wTunnel-3001, wTunnel-5003', valueEN: 'wTunnel-2002, wTunnel-3001, wTunnel-5003' }
      ],
      applicationsES: [
        'Transmisión punto a punto de señales de campo sin PLC intermediario',
        'Extensión inalámbrica de puertos seriales Modbus entre tableros',
        'Replicación de estados de nivel, presión y alarmas a distancia',
        'Sustitución de cableado de control costoso o difícil de canalizar'
      ],
      applicationsEN: [
        'Point-to-point field signal transmission without an intermediate PLC',
        'Wireless extension of Modbus serial ports between control panels',
        'Remote replication of level, pressure, and alarm status',
        'Replacement of expensive or hard-to-conduit control wiring'
      ],
      benefits: [
        { icon: 'settings_ethernet', titleES: 'Túnel "Cable Virtual"', titleEN: '"Virtual Cable" Tunnel', descES: 'Refleja inmediatamente las entradas del transmisor en las salidas del receptor.', descEN: 'Instantly mirrors transmitter inputs onto receiver outputs.' },
        { icon: 'savings', titleES: 'Reducción de Costos', titleEN: 'Cost Reduction', descES: 'Elimina el costo de tendido de cableado e infraestructura física.', descEN: 'Eliminates wiring runs and physical infrastructure costs.' },
        { icon: 'shield_checkmark', titleES: 'Conexión ZigBee Confiable', titleEN: 'Reliable ZigBee Link', descES: 'Garantiza una comunicación inalámbrica estable y segura para datos de campo.', descEN: 'Ensures stable, secure wireless communication for field data.' }
      ]
    },
    {
      id: 'sol-11',
      slug: 'vision-remota-scada-industrial',
      icon: 'visibility',
      categoryES: 'SCADA & VISIÓN REMOTA',
      categoryEN: 'SCADA & REMOTE VISION',
      titleES: 'SOLUCIONES INTEGRALES DE TELEMETRÍA, SCADA Y VISIÓN REMOTA INDUSTRIAL',
      titleEN: 'INTEGRAL TELEMETRY, SCADA & INDUSTRIAL REMOTE VISION SOLUTIONS',
      shortTitleES: 'Visión Remota & SCADA',
      shortTitleEN: 'Remote Vision & SCADA',
      taglineES: 'Alianza estratégica con PROVIX (Canadá) para monitoreo visual en tiempo real e integración con plataformas SCADA en minería e industria.',
      taglineEN: 'Strategic alliance with PROVIX (Canada) for real-time visual monitoring and SCADA integration in mining and industry.',
      descES:
        'Integración de telemetría industrial, redes inalámbricas y sistemas SCADA con soluciones avanzadas de visión remota y supervisión operacional PROVIX para ambientes extremos (Sector Minero e Industrial).',
      descEN:
        'Integration of industrial telemetry, wireless networks, and SCADA with PROVIX advanced remote vision and operational monitoring for extreme environments (Mining & Industry).',
      referentialImage: 'assets/solutions/telemetria-scada-vision-remota-provix.jpg',
      imageBadgeES: 'Sistema de Visión Remota Industrial PROVIX + SCADA',
      imageBadgeEN: 'PROVIX Industrial Remote Vision System + SCADA',
      overviewES:
        'ENERTRONIC INGENIERÍA S.A.C. ha establecido una alianza estratégica con PROVIX (Canadá), líder en visión remota industrial. Esta unión integra la telemetría de proceso, redes inalámbricas y SCADA con cámaras de alta resistencia para la supervisión visual de procesos críticos en minería de superficie y subterránea (equipos como Volare V8L, fajas, chancadoras).',
      overviewEN:
        'ENERTRONIC INGENIERÍA S.A.C. has partnered strategically with Canadian leader PROVIX. Combines process telemetry, wireless networks, and SCADA with heavy-duty cameras for visual supervision of critical processes in surface and underground mining.',
      highlightsES: [
        'Alianza estratégica con PROVIX (Canadá) en visión remota industrial',
        'Supervisión visual de procesos críticos en tiempo real integrada a SCADA',
        'Soluciones resistentes diseñadas para ambientes industriales extremos',
        'Mayor disponibilidad de información para la toma de decisiones en campo'
      ],
      highlightsEN: [
        'Strategic alliance with PROVIX (Canada) in industrial remote vision',
        'Real-time visual supervision of critical processes integrated into SCADA',
        'Rugged solutions built for extreme industrial environments',
        'Enhanced real-time information availability for field decision-making'
      ],
      specs: [
        { labelES: 'Aliado Tecnológico', labelEN: 'Technology Partner', valueES: 'PROVIX Industrial Remote Vision (Canadá)', valueEN: 'PROVIX Industrial Remote Vision (Canada)' },
        { labelES: 'Sectores Objetivo', labelEN: 'Target Sectors', valueES: 'Minería (Subterránea y Tajo Abierto), Industria Pesada', valueEN: 'Mining (Underground & Open Pit), Heavy Industry' },
        { labelES: 'Integración', labelEN: 'Integration', valueES: 'Video IP en tiempo real con Plataformas SCADA y Web', valueEN: 'Real-time IP Video with SCADA & Web Platforms' },
        { labelES: 'Resistencia', labelEN: 'Durability', valueES: 'Gabinete industrial resistente a vibración y polvo severo', valueEN: 'Industrial enclosure resistant to vibration & severe dust' },
        { labelES: 'Servicios', labelEN: 'Services', valueES: 'Telemetría, SCADA, Conectividad Inalámbrica, Visión Remota', valueEN: 'Telemetry, SCADA, Wireless Connectivity, Remote Vision' }
      ],
      applicationsES: [
        'Monitoreo remoto para minería subterránea y maquinaria pesada',
        'Supervisión visual de procesos críticos (Chancadoras, Fajas transportadoras)',
        'Vigilancia operacional en tiempo real integrada al centro de mando SCADA',
        'Monitoreo visual para la seguridad y control de activos en zonas de riesgo'
      ],
      applicationsEN: [
        'Remote monitoring for underground mining and heavy machinery',
        'Visual supervision of critical processes (Crushers, Conveyors)',
        'Real-time operational surveillance integrated into SCADA command center',
        'Visual monitoring for asset security and control in hazardous areas'
      ],
      benefits: [
        { icon: 'visibility', titleES: 'Monitoreo Visual en Vivo', titleEN: 'Live Visual Monitoring', descES: 'Visualización de procesos críticos en tiempo real desde salas SCADA.', descEN: 'Real-time visual feed of critical processes from SCADA control rooms.' },
        { icon: 'handshake', titleES: 'Alianza Líder PROVIX', titleEN: 'PROVIX Leading Alliance', descES: 'Tecnología canadiense de visión remota probada en la minería más exigente.', descEN: 'Canadian remote vision technology proven in demanding mining ops.' },
        { icon: 'verified_user', titleES: 'Seguridad Operacional', titleEN: 'Operational Safety', descES: 'Optimiza la toma de decisiones y protege al personal mediante supervisión a distancia.', descEN: 'Optimizes decision-making and protects personnel through remote control.' }
      ]
    }
  ]);

  public getSolutions(): SolutionItem[] {
    return this.solutions();
  }

  public getSolutionBySlug(slug: string): SolutionItem | undefined {
    return this.solutions().find((s) => s.slug === slug);
  }
}
