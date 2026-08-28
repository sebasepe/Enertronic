import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { LanguageService } from '../../core/services/language.service';
import { Subscription, timer, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BlogPost {
  id: string;
  image: string;
  categoryES: string;
  categoryEN: string;
  titleES: string;
  titleEN: string;
  excerptES: string;
  excerptEN: string;
  contentES: string[];
  contentEN: string[];
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  externalUrl?: string;
  sourceName?: string;
  sourceCategoryId?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  public langService = inject(LanguageService);

  private timerSubscription?: Subscription;
  public isLoadingRss = signal<boolean>(false);
  public lastUpdated = signal<Date | null>(null);

  public selectedCategory = signal<string>('ALL');
  public selectedPost = signal<BlogPost | null>(null);

  public categories = [
    { id: 'ALL', labelES: 'Todos', labelEN: 'All' },
    { id: 'HARDWARE_IOT', labelES: 'Hardware & IoT', labelEN: 'Hardware & IoT' },
    { id: 'ROUTERS_4G_5G', labelES: 'Routers & 4G/5G', labelEN: 'Routers & 4G/5G' },
    { id: 'SCADA', labelES: 'SCADA', labelEN: 'SCADA' },
  ];

  public rssPosts = signal<BlogPost[]>([]);

  public blogPosts: BlogPost[] = [
    {
      id: 'post-1',
      image: 'assets/blog/blog-1.png',
      categoryES: 'Enertronic • Radio Mesh 2.4GHz',
      categoryEN: 'Enertronic • 2.4GHz Mesh Radio',
      titleES: 'Telemetría por radio mesh 2.4GHz en Perú',
      titleEN: '2.4GHz Mesh Radio Telemetry in Peru',
      excerptES: 'Integra sensores dispersos en tu planta mediante telemetría por radio mesh 2.4GHz sin necesidad de cableado complejo ni licencias de frecuencia.',
      excerptEN: 'Integrate scattered sensors in your plant using 2.4GHz mesh radio telemetry without complex wiring or frequency licensing requirements.',
      date: '28 Jul 2025',
      readTime: '4 min lectura',
      author: 'Ing. Carlos Mendoza',
      featured: true,
      sourceName: 'Enertronic',
      sourceCategoryId: 'ENERTRONIC',
      contentES: [
        'En el ámbito industrial peruano, el tendido de cables de comunicación entre tanques, pozos y centros de control suele representar más del 60% del costo total de un proyecto de automatización.',
        'La tecnología de telemetría por radio mesh en banda 2.4GHz libre permite interconectar concentradores seriales y nodos remotos con salto autorregenerable. Cada nodo no solo envía sus datos (4-20mA, Modbus RTU, entradas digitales), sino que también actúa como repetidor para nodos lejanos.',
        'Ventajas clave para plantas en Perú:',
        '• Cero costos de cableado estructurado en extensos terrenos industriales o mineros.',
        '• Banda libre de 2.4GHz conforme a la normativa del MTC Perú.',
        '• Encriptación AES-128 para alta ciberseguridad industrial.',
        '• Integración directa con concentradores Ethernet y software SCADA central.',
      ],
      contentEN: [
        'In the Peruvian industrial environment, wiring communications between tanks, wells, and control centers often represents over 60% of total automation costs.',
        '2.4GHz unlicensed mesh radio telemetry technology enables seamless interconnection between serial concentrators and remote nodes with auto-routing capability.',
        'Key advantages for plants in Peru:',
        '• Zero structured cabling costs across extensive industrial or mining sites.',
        '• 2.4GHz license-free band fully compliant with MTC Peru regulations.',
        '• Robust AES-128 encryption for industrial cybersecurity.',
        '• Direct integration with Ethernet concentrators and central SCADA software.',
      ],
    },
    {
      id: 'post-2',
      image: 'assets/blog/blog-2.png',
      categoryES: 'Enertronic • MQTT & IIoT',
      categoryEN: 'Enertronic • MQTT & IIoT',
      titleES: 'Telemetría vía MQTT para proyectos IIoT en Perú',
      titleEN: 'MQTT Telemetry for IIoT Projects in Peru',
      excerptES: 'Conecta tus sensores a la nube mediante telemetría vía MQTT con el respaldo de nuestro hardware SMART RTU GRD y conectividad 4G.',
      excerptEN: 'Connect your sensors to the cloud via MQTT telemetry backed by our SMART RTU GRD hardware and 4G connectivity.',
      date: '15 Jul 2025',
      readTime: '5 min lectura',
      author: 'Equipo Técnico Enertronic',
      featured: true,
      sourceName: 'Enertronic',
      sourceCategoryId: 'ENERTRONIC',
      contentES: [
        'El protocolo MQTT (Message Queuing Telemetry Transport) se ha consolidación como el estándar indiscutible para proyectos de Internet Industrial de las Cosas (IIoT).',
        'En Enertronic implementamos dispositivos SMART RTU GRD-MQ-4G diseñados para entornos industriales exigentes. Estos equipos capturan señales de campo (4-20mA, 0-10V, entradas/salidas digitales y puertos RS-485 Modbus) y las transmiten en tiempo real utilizando tramas MQTT livianas a través de la red celular 4G.',
        'Características principales del sistema:',
        '• Consumo de datos ultra reducido (hasta 80% menor que HTTP tradicional).',
        '• Publicación de eventos por cambio de estado (Report by Exception).',
        '• Almacenamiento local histórico (Datalogger) en caso de pérdida temporal de señal celular.',
        '• Compatibilidad nativa con brokers MQTT públicos y privados en la nube.',
      ],
      contentEN: [
        'MQTT (Message Queuing Telemetry Transport) has consolidated as the undisputed standard for Industrial IoT (IIoT) projects.',
        'At Enertronic we deploy SMART RTU GRD-MQ-4G devices tailored for demanding industrial environments.',
        'Main system features:',
        '• Ultra-low data bandwidth consumption (up to 80% lower than traditional HTTP).',
        '• Event-driven publication (Report by Exception).',
        '• Local historical data logging in case of temporary cellular network loss.',
        '• Native compatibility with public and private cloud MQTT brokers.',
      ],
    },
    {
      id: 'post-3',
      image: 'assets/blog/blog-3.png',
      categoryES: 'Enertronic • Software SCADA',
      categoryEN: 'Enertronic • SCADA Software',
      titleES: 'Automatización de software SCADA en Perú',
      titleEN: 'SCADA Software Automation in Peru',
      excerptES: '¿Necesitas automatización SCADA en Perú? En Enertronic diseñamos e implementamos soluciones industriales a medida con arquitectura cibersegura.',
      excerptEN: 'Need SCADA automation in Peru? At Enertronic we design and implement custom industrial solutions with cybersecure architecture.',
      date: '02 Jul 2025',
      readTime: '6 min lectura',
      author: 'Ing. Rodrigo Alarcón',
      featured: true,
      sourceName: 'Enertronic',
      sourceCategoryId: 'ENERTRONIC',
      contentES: [
        'La automatización mediante software SCADA permite supervisar, controlar y recopilar datos en tiempo real de todos los activos críticos de una empresa en el Perú.',
        'Nuestros desarrollos HMI/SCADA ofrecen dashboards intuitivos, gráficos de tendencias de alta precisión, gestión inteligente de alarmas por SMS/Email y reportes automatizados de consumo hídrico y energético.',
        '¿Por qué elegir las soluciones SCADA de Enertronic en Perú?:',
        '• Soporte para protocolos multimarca: Modbus RTU/TCP, DNP3, IEC 60870-5-104 y MQTT Industrial.',
        '• Arquitectura alineada con los estándares de ciberseguridad ISA/IEC 62443.',
        '• Capacidad de integración con sistemas ERP (SAP, Oracle) y bases de datos SQL / Historian.',
        '• Soporte técnico local capacitado en fábrica.',
      ],
      contentEN: [
        'SCADA software automation enables real-time supervision, control, and data acquisition across critical assets in Peru.',
        'Our HMI/SCADA developments feature intuitive dashboards, high-precision trend graphing, smart SMS/Email alarm management, and automated water/energy consumption reports.',
        'Why choose Enertronic SCADA solutions in Peru?:',
        '• Multi-vendor protocol support: Modbus RTU/TCP, DNP3, IEC 60870-5-104, and Industrial MQTT.',
        '• Architecture aligned with ISA/IEC 62443 cybersecurity standards.',
        '• Seamless integration capability with ERP systems (SAP, Oracle) and SQL/Historian databases.',
        '• Factory-trained local technical support.',
      ],
    },
    {
      id: 'post-4',
      image: 'assets/slides/slide-4.png',
      categoryES: 'Enertronic • Satelital & Remote',
      categoryEN: 'Enertronic • Satellite & Remote',
      titleES: 'Monitoreo Satelital STARLINK e Iridium en Zonas Remotas de Perú',
      titleEN: 'STARLINK & Iridium Satellite Monitoring in Remote Peru',
      excerptES: 'Garantiza la conectividad ininterrumpida de tus estaciones de bombeo y oleoductos en zonas aisladas de los Andes y la Selva peruana.',
      excerptEN: 'Ensure continuous connectivity for pumping stations and pipelines in remote Andean and Amazonian regions of Peru.',
      date: '18 Jun 2025',
      readTime: '5 min lectura',
      author: 'Equipo Técnico Enertronic',
      featured: false,
      sourceName: 'Enertronic',
      sourceCategoryId: 'ENERTRONIC',
      contentES: [
        'En regiones geográficas complejas de Perú donde la cobertura celular es inexistente, la telemetría satelital Iridium y STARLINK asegura el control continuo.',
        'Integración con RTUs inteligentes de bajo consumo alimentados por energía solar de respaldo.',
      ],
      contentEN: [
        'In complex geographical regions of Peru where cellular coverage is unavailable, Iridium and STARLINK satellite telemetry ensures continuous control.',
      ],
    },
    {
      id: 'post-5',
      image: 'assets/slides/slide-2.png',
      categoryES: 'Enertronic • Gestión Hídrica',
      categoryEN: 'Enertronic • Water Management',
      titleES: 'Soluciones de Medición de Caudal y Aforos de Agua en Perú',
      titleEN: 'Flow Measurement & Water Gauging Solutions in Peru',
      excerptES: 'Optimización de recursos hídricos en canales de riego, plantas de tratamiento y vertederos mediante sensores ultrasónicos y radar.',
      excerptEN: 'Water resource optimization in irrigation channels, treatment plants, and spillways via ultrasonic and radar sensors.',
      date: '05 Jun 2025',
      readTime: '4 min lectura',
      author: 'Ing. Carlos Mendoza',
      featured: false,
      sourceName: 'Enertronic',
      sourceCategoryId: 'ENERTRONIC',
      contentES: [
        'La precisión en la medición de caudales es vital para el cumplimiento normativo con la Autoridad Nacional del Agua (ANA) en Perú.',
      ],
      contentEN: [
        'Precision in flow measurement is essential for compliance with the National Water Authority (ANA) in Peru.',
      ],
    },
    {
      id: 'post-6',
      image: 'assets/slides/slide-3.png',
      categoryES: 'Enertronic • Energía Solar',
      categoryEN: 'Enertronic • Solar Energy',
      titleES: 'Integración de Baterías de Litio y Energía Solar para RTUs',
      titleEN: 'Lithium Battery & Solar Power Integration for Field RTUs',
      excerptES: 'Autonomía energética de alta durabilidad para nodos de medición remota sin acceso a la red eléctrica tradicional en Perú.',
      excerptEN: 'High-durability energy autonomy for remote measurement nodes lacking access to grid electricity in Peru.',
      date: '20 May 2025',
      readTime: '4 min lectura',
      author: 'Ing. Rodrigo Alarcón',
      featured: false,
      sourceName: 'Enertronic',
      sourceCategoryId: 'ENERTRONIC',
      contentES: [
        'Sistemas fotovoltaicos autónomos con baterías LiFePO4 para garantizar 5 a 7 días de reserva operacional sin sol.',
      ],
      contentEN: [
        'Autonomous photovoltaic systems with LiFePO4 batteries guaranteeing 5 to 7 days of operational backup without sun.',
      ],
    },
  ];

  ngOnInit(): void {
    // Temporizador RxJS: 0 inicial (descarga al instante al entrar al blog),
    // y repetido automáticamente cada 15 minutos (900,000 ms) de forma invisible.
    this.timerSubscription = timer(0, 15 * 60 * 1000).subscribe(() => {
      this.loadRssFeeds();
    });
  }

  ngOnDestroy(): void {
    // Apaga el temporizador al salir de la sección Blog para ahorrar datos y memoria del navegador.
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public loadRssFeeds(): void {
    this.isLoadingRss.set(true);

    const hackster$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://www.hackster.io/news.atom')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    const advantech$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://icr.advantech.com/blog/rss')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    const iotAnalytics$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://iot-analytics.com/category/industrial-iot/feed/')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    const iotForAll$ = this.http
      .get<any>('https://api.rss2json.com/v1/api.json?rss_url=https://www.iotforall.com/feed')
      .pipe(catchError(() => of({ status: 'error', items: [] })));

    forkJoin([hackster$, advantech$, iotAnalytics$, iotForAll$]).subscribe({
      next: ([hacksterRes, advantechRes, iotAnalyticsRes, iotForAllRes]) => {
        const livePosts: BlogPost[] = [];

        // 1. Hackster.io (Noticias de Hardware e IoT)
        if (hacksterRes?.status === 'ok' && Array.isArray(hacksterRes.items)) {
          hacksterRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'HACKSTER',
                'Hackster.io',
                'Hardware e IoT',
                'assets/blog/blog-1.png',
                `hackster-${idx}`
              )
            );
          });
        }

        // 2. Advantech (Telemetría, Routers Industriales y 4G/5G)
        if (advantechRes?.status === 'ok' && Array.isArray(advantechRes.items)) {
          advantechRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'ADVANTECH',
                'Advantech',
                'Routers & 4G/5G',
                'assets/blog/blog-2.png',
                `advantech-${idx}`
              )
            );
          });
        }

        // 3. IoT Analytics (SCADA, LoRaWAN y Mercado Industrial)
        if (iotAnalyticsRes?.status === 'ok' && Array.isArray(iotAnalyticsRes.items)) {
          iotAnalyticsRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'IOT_ANALYTICS',
                'IoT Analytics',
                'SCADA & IIoT',
                'assets/blog/blog-3.png',
                `iotanalytics-${idx}`
              )
            );
          });
        }

        // 4. IoT For All (Casos de uso general de Internet de las Cosas)
        if (iotForAllRes?.status === 'ok' && Array.isArray(iotForAllRes.items)) {
          iotForAllRes.items.slice(0, 6).forEach((item: any, idx: number) => {
            livePosts.push(
              this.transformRssItemToBlogPost(
                item,
                'IOT_FOR_ALL',
                'IoT For All',
                'Casos IIoT',
                'assets/slides/slide-4.png',
                `iotforall-${idx}`
              )
            );
          });
        }

        this.rssPosts.set(livePosts);
        this.lastUpdated.set(new Date());
        this.isLoadingRss.set(false);
      },
      error: (err) => {
        console.error('Error cargando noticias RSS:', err);
        this.isLoadingRss.set(false);
      },
    });
  }

  private transformRssItemToBlogPost(
    item: any,
    sourceCategoryId: string,
    sourceName: string,
    categoryLabel: string,
    defaultImage: string,
    idPrefix: string
  ): BlogPost {
    const imageUrl = this.extractImageUrl(item, defaultImage);
    const excerptText = this.extractExcerpt(item.description || item.content || '');
    const formattedDate = this.formatRssDate(item.pubDate);

    return {
      id: `${idPrefix}-${item.guid || item.link || Math.random()}`,
      image: imageUrl,
      categoryES: `${sourceName} • ${categoryLabel}`,
      categoryEN: `${sourceName} • ${categoryLabel}`,
      titleES: item.title || 'Noticia de Tecnología e IoT',
      titleEN: item.title || 'Technology & IoT News',
      excerptES: excerptText,
      excerptEN: excerptText,
      contentES: [excerptText],
      contentEN: [excerptText],
      date: formattedDate,
      readTime: '3 min',
      author: item.author || sourceName,
      externalUrl: item.link,
      sourceName: sourceName,
      sourceCategoryId: sourceCategoryId,
    };
  }

  private extractImageUrl(item: any, defaultImage: string): string {
    if (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http')) {
      return item.thumbnail;
    }
    if (item.enclosure && item.enclosure.link && typeof item.enclosure.link === 'string' && item.enclosure.link.startsWith('http')) {
      return item.enclosure.link;
    }
    if (item.description && typeof item.description === 'string') {
      const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        let src = imgMatch[1];
        if (src.startsWith('//')) src = 'https:' + src;
        return src;
      }
    }
    return defaultImage;
  }

  private extractExcerpt(description: string, maxLength: number = 160): string {
    if (!description) return '';
    const clean = description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean.length > maxLength) {
      return clean.substring(0, maxLength) + '...';
    }
    return clean;
  }

  private formatRssDate(pubDateStr: string): string {
    if (!pubDateStr) return new Date().toLocaleDateString();
    try {
      const d = new Date(pubDateStr);
      if (isNaN(d.getTime())) return pubDateStr;
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return pubDateStr;
    }
  }

  public filterCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  public get filteredPosts(): BlogPost[] {
    const cat = this.selectedCategory();
    const all = [...this.blogPosts, ...this.rssPosts()];
    if (cat === 'ALL') return all;
    if (cat === 'HARDWARE_IOT') {
      return all.filter((p) => p.sourceCategoryId === 'HACKSTER' || p.categoryES.includes('Hardware') || p.categoryES.includes('Radio Mesh'));
    }
    if (cat === 'ROUTERS_4G_5G') {
      return all.filter((p) => p.sourceCategoryId === 'ADVANTECH' || p.categoryES.includes('MQTT') || p.categoryES.includes('Routers'));
    }
    if (cat === 'SCADA') {
      return all.filter((p) => p.sourceCategoryId === 'IOT_ANALYTICS' || p.categoryES.includes('SCADA'));
    }
    return all;
  }

  public openArticle(post: BlogPost): void {
    this.selectedPost.set(post);
  }

  public closeArticle(): void {
    this.selectedPost.set(null);
  }
}
