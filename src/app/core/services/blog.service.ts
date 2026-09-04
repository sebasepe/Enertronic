import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);

  public isLoadingRss = signal<boolean>(false);
  public lastUpdated = signal<Date | null>(null);
  public rssPosts = signal<BlogPost[]>([]);

  // Artículos locales técnicos y de ingeniería para Enertronic Perú
  public readonly staticPosts: BlogPost[] = [
    {
      id: 'mesh-telemetry-24ghz',
      image: 'assets/blog/blog-1.png',
      categoryES: 'Hardware & IoT',
      categoryEN: 'Hardware & IoT',
      titleES: 'Telemetría por Radio Mesh 2.4GHz para Plantas Industriales en Perú',
      titleEN: '2.4GHz Mesh Radio Telemetry for Industrial Plants in Peru',
      excerptES: 'Integra sensores dispersos en minería e industria sin depender de redes celulares o cableados costosos mediante topologías de red en malla autorrecuperables.',
      excerptEN: 'Integrate scattered sensors in mining and industry without relying on cellular networks or costly wiring using self-healing mesh topology.',
      contentES: [
        'En entornos industriales y mineros de difícil acceso en el Perú, el cableado de señales de instrumentación suele representar hasta el 60% del costo total de un proyecto de automatización.',
        'La telemetría por Radio Mesh a 2.4GHz implementa topologías de red en malla donde cada nodo transmisor actúa como un repetidor inteligente. Esto permite cubrir grandes extensiones geográficas como depósitos de relaves, tajos abiertos o plantas de procesamiento.',
        'Entre las principales ventajas destacan la autorrecuperación de la red ante fallos de línea de vista, el consumo de ultra baja potencia adecuado para alimentarse por paneles solares, y la integración directa mediante protocolos RS-485 Modbus RTU a sistemas SCADA centralizados.'
      ],
      contentEN: [
        'In hard-to-reach industrial and mining environments in Peru, instrumentation cabling typically accounts for up to 60% of total automation project costs.',
        '2.4GHz Mesh Radio Telemetry implements mesh network topologies where each transmitter node acts as a smart repeater, enabling coverage across vast areas such as tailing dams, open pits, or processing plants.',
        'Key benefits include self-healing network routing upon line-of-sight obstructions, ultra-low power consumption for solar power compatibility, and direct RS-485 Modbus RTU integration into centralized SCADA systems.'
      ],
      date: '28 Ago 2026',
      readTime: '5 min',
      author: 'Ing. Carlos Mendoza - Enertronic',
      featured: true,
      sourceCategoryId: 'HARDWARE_IOT'
    },
    {
      id: 'mqtt-iiot-telemetry',
      image: 'assets/blog/blog-2.png',
      categoryES: 'Routers & 4G/5G',
      categoryEN: 'Routers & 4G/5G',
      titleES: 'Arquitectura de Telemetría vía MQTT y VPN Industrial para Proyectos IIoT',
      titleEN: 'MQTT Telemetry Architecture and Industrial VPN for IIoT Projects',
      excerptES: 'Conexiones seguras y ligeras de baja latencia entre routers celulares industriales 4G/5G y plataformas SCADA en la nube para monitoreo remoto.',
      excerptEN: 'Secure, lightweight, low-latency connections between 4G/5G industrial cellular routers and cloud SCADA platforms for remote monitoring.',
      contentES: [
        'El protocolo MQTT se ha consolidado como el estándar de comunicación de facto para el Internet de las Cosas Industrial (IIoT) gracias a su arquitectura de publicación/suscripción de mínima sobrecarga de ancho de banda.',
        'Para proyectos en estaciones meteorológicas, monitoreo hídrico y pozos petroleros en Talara o la selva peruana, combinamos routers 4G/5G grado industrial con túneles VPN cifrados IPsec/OpenVPN.',
        'Esta arquitectura garantiza transmisiones en tiempo real con reconexión automática ante caídas de señal de los operadores móviles locales, manteniendo los datos históricos a salvo mediante almacenamiento buffer en la tarjeta SD interna del gateway.'
      ],
      contentEN: [
        'The MQTT protocol has become the de facto communication standard for IIoT due to its lightweight publish/subscribe architecture and minimal bandwidth consumption.',
        'For weather stations, water telemetry (SEDAPAL / SENAMHI), and oil wells in Talara or the Peruvian rainforest, we pair industrial-grade 4G/5G routers with encrypted IPsec/OpenVPN tunnels.',
        'This architecture guarantees real-time telemetry with automatic reconnection during cellular dropouts, preserving historical logs via internal SD buffer storage.'
      ],
      date: '15 Ago 2026',
      readTime: '6 min',
      author: 'Ing. Roberto Silva - Enertronic',
      featured: true,
      sourceCategoryId: 'ROUTERS_4G_5G'
    },
    {
      id: 'scada-automation-peru',
      image: 'assets/blog/blog-3.png',
      categoryES: 'SCADA',
      categoryEN: 'SCADA',
      titleES: 'Automatización y Modernización de Sistemas SCADA en Sectores Críticos',
      titleEN: 'Automation and Modernization of SCADA Systems in Critical Sectors',
      excerptES: 'Guía técnica sobre la migración de sistemas SCADA legacy a entornos modernos Web-based con analítica predictiva y monitoreo remoto 24/7.',
      excerptEN: 'Technical guide on migrating legacy SCADA systems to modern web-based environments with predictive analytics and 24/7 remote monitoring.',
      contentES: [
        'La supervisión y adquisición de datos en tiempo real (SCADA) es el pilar de la eficiencia operativa en centrales hidroeléctricas, plantas potabilizadoras y estaciones transmisoras.',
        'En Enertronic diseñamos HMI/SCADA de última generación con soporte para protocolos industriales estándar como IEC 60870-5-104, DNP3, Modbus TCP y OPC UA.',
        'Al integrar dashboards HTML5 responsive y alertas multicanal (Email/SMS/WhatsApp), los operadores y gerentes de planta pueden supervisar variables clave en tiempo real desde cualquier dispositivo autorizado con total ciberseguridad.'
      ],
      contentEN: [
        'Supervisory Control and Data Acquisition (SCADA) is the backbone of operational efficiency in hydroelectric plants, water treatment facilities, and transmission stations.',
        'At Enertronic we design next-generation HMI/SCADA systems supporting standard industrial protocols including IEC 60870-5-104, DNP3, Modbus TCP, and OPC UA.',
        'By integrating responsive HTML5 dashboards and multi-channel alerts (Email/SMS/WhatsApp), plant operators can monitor key variables live from any authorized device with top-tier cybersecurity.'
      ],
      date: '02 Ago 2026',
      readTime: '7 min',
      author: 'Ing. Ana Gutiérrez - Enertronic',
      featured: true,
      sourceCategoryId: 'SCADA'
    },
    {
      id: 'sat-hybrid-telemetry',
      image: 'assets/slides/slide-4.png',
      categoryES: 'Routers & 4G/5G',
      categoryEN: 'Routers & 4G/5G',
      titleES: 'Telemetría Híbrida Celular + Satelital en Zonas Sin Cobertura en Perú',
      titleEN: 'Hybrid Cellular + Satellite Telemetry in Zero-Coverage Zones in Peru',
      excerptES: 'Cómo garantizar la transmisión ininterrumpida de datos críticos en la cordillera y selva peruana mediante redundancia satelital Iridium / Inmarsat.',
      excerptEN: 'How to ensure uninterrupted critical data transmission in the Peruvian Andes and Amazon using Iridium / Inmarsat satellite failover.',
      contentES: [
        'En ubicaciones geográficas extremas donde la cobertura celular es inexistente o inestable, la telemetría satelital ofrece una garantía de conectividad constante del 99.9%.',
        'Utilizando gateways con failover inteligente, el sistema transmite por red 4G/5G como enlace principal y commuta automáticamente a canal satelital comprimido en caso de interrupción.',
        'Esta tecnología es ideal para estaciones hidrometeorológicas del SENAMHI, ductos de transporte de hidrocarburos y estaciones remotas de minería.'
      ],
      contentEN: [
        'In extreme geographical locations where cellular coverage is absent or unreliable, satellite telemetry offers a 99.9% uptime guarantee.',
        'Using smart failover gateways, the system transmits via 4G/5G primary link and switches to compressed satellite channels automatically during outages.',
        'This technology is ideal for SENAMHI hydrometeorological stations, hydrocarbon pipelines, and remote mining sites.'
      ],
      date: '20 Jul 2026',
      readTime: '4 min',
      author: 'Equipo Técnico Enertronic',
      featured: false,
      sourceCategoryId: 'ROUTERS_4G_5G'
    }
  ];

  public getAllPosts(): BlogPost[] {
    return [...this.staticPosts, ...this.rssPosts()];
  }

  public getLatestPosts(limit: number = 3): BlogPost[] {
    const all = this.getAllPosts();
    return all.slice(0, limit);
  }

  public getPostById(id: string): BlogPost | undefined {
    return this.getAllPosts().find((p) => p.id === id);
  }

  public loadRssFeeds(): void {
    if (this.isLoadingRss()) return;
    this.isLoadingRss.set(true);

    const sources = [
      {
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://iot-analytics.com/category/industrial-iot/feed/',
        id: 'IOT_ANALYTICS',
        name: 'IoT Analytics',
        category: 'SCADA & IIoT',
        image: 'assets/blog/blog-3.png',
        prefix: 'iotanalytics',
      },
      {
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.iotforall.com/feed',
        id: 'IOT_FOR_ALL',
        name: 'IoT For All',
        category: 'Casos IIoT',
        image: 'assets/slides/slide-4.png',
        prefix: 'iotforall',
      },
    ];

    forkJoin(sources.map((s) => this.fetchRssFeed(s.url))).subscribe({
      next: (results) => {
        const livePosts: BlogPost[] = [];
        results.forEach((res, i) => {
          const s = sources[i];
          if (res?.status === 'ok' && Array.isArray(res.items)) {
            res.items.slice(0, 6).forEach((item: any, idx: number) =>
              livePosts.push(this.transformRssItemToBlogPost(item, s.id, s.name, s.category, s.image, `${s.prefix}-${idx}`))
            );
          }
        });
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

  private fetchRssFeed(url: string) {
    return this.http.get<any>(url).pipe(catchError(() => of({ status: 'error', items: [] })));
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
      author: this.cleanAuthorName(item.author, sourceName),
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

  private cleanAuthorName(rawAuthor: string, defaultName: string): string {
    if (!rawAuthor || typeof rawAuthor !== 'string') return defaultName;
    let author = rawAuthor.trim();
    if (!author) return defaultName;

    const matches = author.match(/\(([^()]+)\)/g);
    if (matches && matches.length > 0) {
      for (let i = matches.length - 1; i >= 0; i--) {
        const matchText = matches[i].replace(/[()]/g, '').trim();
        if (matchText && !matchText.includes('@') && !matchText.startsWith('http')) {
          return matchText;
        }
      }
    }

    try {
      author = decodeURIComponent(author);
    } catch {}

    author = author.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '').trim();
    author = author.replace(/https?:\/\/\S+/g, '').replace(/[a-zA-Z0-9-]+\.(com|org|net|io|edu|gov|co|pe)[^\s]*/gi, '').trim();
    author = author.replace(/^[\s\-_:;()]+|[\s\-_:;()]+$/g, '').trim();

    if (!author || author.length < 2) {
      return defaultName;
    }
    return author;
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
}
