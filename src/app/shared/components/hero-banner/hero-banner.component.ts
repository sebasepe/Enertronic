import { Component, signal, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

export interface HeroSlide {
  id: number;
  image: string;
  titleES: string;
  titleEN: string;
  subtitleES: string;
  subtitleEN: string;
  ctaTextES: string;
  ctaTextEN: string;
  ctaRoute: string;
}

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  public langService = inject(LanguageService);

  public readonly activeSlide = signal<number>(0);
  private autoPlayTimer: any;

  public slides: HeroSlide[] = [
    {
      id: 0,
      image: 'assets/slides/slide-1.png',
      titleES: 'CONTROL TOTAL DE SU OPERACIÓN INDUSTRIAL',
      titleEN: 'TOTAL CONTROL OF YOUR INDUSTRIAL OPERATION',
      subtitleES: 'SCADA · TELEMETRÍA · IIoT CON IA · LoRaWAN · VISIÓN REMOTA',
      subtitleEN: 'SCADA · TELEMETRY · IIoT WITH AI · LoRaWAN · REMOTE VISION',
      ctaTextES: 'VER SOLUCIONES',
      ctaTextEN: 'VIEW SOLUTIONS',
      ctaRoute: '/soluciones',
    },
    {
      id: 1,
      image: 'assets/slides/slide-2.png',
      titleES: 'AUTOMATIZACIÓN Y MONITOREO EN TIEMPO REAL',
      titleEN: 'REAL-TIME AUTOMATION & MONITORING FOR YOUR INDUSTRY',
      subtitleES: 'Software SCADA y soluciones de telemetría que optimizan tus procesos, mejoran la eficiencia y garantizan el control total.',
      subtitleEN: 'SCADA software and telemetry solutions that optimize your processes, improve efficiency, and ensure total control.',
      ctaTextES: 'VER MÁS',
      ctaTextEN: 'LEARN MORE',
      ctaRoute: '/soluciones',
    },
    {
      id: 2,
      image: 'assets/slides/slide-3.png',
      titleES: 'ENERGÍA INTELIGENTE Y SOSTENIBLE',
      titleEN: 'SMART & SUSTAINABLE ENERGY WITH LITHIUM BATTERIES',
      subtitleES: 'Soluciones energéticas confiables con tecnología en baterías de litio que impulsan tu industria con mayor autonomía y eficiencia.',
      subtitleEN: 'Reliable energy solutions powered by lithium battery technology driving your industry with greater autonomy.',
      ctaTextES: 'VER MÁS',
      ctaTextEN: 'LEARN MORE',
      ctaRoute: '/productos',
    },
    {
      id: 3,
      image: 'assets/slides/slide-4.png',
      titleES: 'VIGILANCIA SATELITAL DEL TERRENO Y DUCTOS',
      titleEN: 'SATELLITE SURVEILLANCE OF TERRAIN & PIPELINES',
      subtitleES: 'Para garantizar la seguridad y continuidad operativa en el sector gas e infraestructura remota.',
      subtitleEN: 'To ensure safety and operational continuity in the gas sector and remote infrastructure.',
      ctaTextES: 'VER MÁS',
      ctaTextEN: 'LEARN MORE',
      ctaRoute: '/soluciones',
    },
    {
      id: 4,
      image: 'assets/slides/slide-5.png',
      titleES: 'MONITOREO DE LA ESTABILIDAD DEL TERRENO',
      titleEN: 'MONITORING TERRAIN STABILITY & INTEGRITY',
      subtitleES: 'Monitoreo de ductos en tiempo real mediante tecnología satelital avanzada, garantizando seguridad y continuidad operativa.',
      subtitleEN: 'Real-time pipeline monitoring via advanced satellite tech, guaranteeing safety and operational continuity.',
      ctaTextES: 'VER MÁS',
      ctaTextEN: 'LEARN MORE',
      ctaRoute: '/soluciones',
    },
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  public goToSlide(index: number): void {
    this.activeSlide.set(index);
    this.restartAutoPlay();
  }

  public prevSlide(): void {
    const current = this.activeSlide();
    const prev = current === 0 ? this.slides.length - 1 : current - 1;
    this.goToSlide(prev);
  }

  public nextSlide(): void {
    const current = this.activeSlide();
    const next = (current + 1) % this.slides.length;
    this.goToSlide(next);
  }

  private startAutoPlay(): void {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, 6500);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
