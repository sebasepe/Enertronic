import { Component, signal, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../../core/services/language.service';

export interface HeroSlide {
  id: number;
  type?: 'image' | 'video';
  image?: string;
  videoUrl?: string;
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
    MatTooltipModule,
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
      type: 'video',
      videoUrl: 'assets/slides/video-enertronic.mp4',
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
      ctaRoute: '/soluciones',
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

  public readonly isPlaying = signal<boolean>(true);
  public readonly isMuted = signal<boolean>(true);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  public exitFullscreenIfActive(): void {
    if (document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }

  public onVideoEnded(): void {
    this.exitFullscreenIfActive();
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((v) => {
      v.pause();
    });
    this.nextSlide();
  }

  public goToSlide(index: number): void {
    this.exitFullscreenIfActive();
    // Pausar cualquier video activo al cambiar de diapositiva
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((v) => {
      v.pause();
    });

    this.activeSlide.set(index);
    this.restartAutoPlay();

    if (this.slides[index]?.type === 'video') {
      setTimeout(() => {
        const activeVideo = this.getActiveVideo();
        if (activeVideo) {
          activeVideo.currentTime = 0;
          activeVideo.play().then(() => {
            this.isPlaying.set(true);
          }).catch(() => {});
        }
      }, 50);
    }
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

  public getActiveVideo(): HTMLVideoElement | null {
    return document.querySelector('.hero-slide.active video') as HTMLVideoElement;
  }

  public togglePlayPause(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const video = this.getActiveVideo();
    if (!video) return;
    if (video.paused) {
      video.play().then(() => {
        this.isPlaying.set(true);
      }).catch(() => {});
    } else {
      video.pause();
      this.isPlaying.set(false);
    }
  }

  public toggleMute(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const video = this.getActiveVideo();
    if (!video) return;
    video.muted = !video.muted;
    this.isMuted.set(video.muted);
  }

  public toggleFullscreen(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const video = this.getActiveVideo();
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      if (video.requestFullscreen) {
        video.requestFullscreen().catch(() => {});
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    const currentSlide = this.slides[this.activeSlide()];
    
    // Si la diapositiva actual es un video, avanza automáticamente al finalizar el video (evento ended)
    if (currentSlide?.type === 'video') {
      return;
    }

    // Para las imágenes normales, avanza a los 6.5 segundos
    this.autoPlayTimer = setTimeout(() => {
      this.nextSlide();
    }, 6500);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
