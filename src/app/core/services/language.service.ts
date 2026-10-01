import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Importación estática de las traducciones — no depende de HTTP ni rutas del servidor
import esTranslations from '../../../../public/i18n/es.json';
import enTranslations from '../../../../public/i18n/en.json';

export type Language = 'ES' | 'EN';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);

  public readonly currentLang = signal<Language>('ES');

  /** Mapas de traducción cargados como módulos estáticos (disponibles de forma inmediata) */
  private readonly translationsES: Record<string, any> = esTranslations;
  private readonly translationsEN: Record<string, any> = enTranslations;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('enertronic_lang') as Language;
      if (savedLang && (savedLang === 'ES' || savedLang === 'EN')) {
        this.currentLang.set(savedLang);
      }

      effect(() => {
        const lang = this.currentLang();
        localStorage.setItem('enertronic_lang', lang);
      });
    }
  }

  public setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }

  public toggleLanguage(): void {
    this.currentLang.update((prev) => (prev === 'ES' ? 'EN' : 'ES'));
  }

  /**
   * Resuelve una clave i18n con notación de punto (e.g. 'HEADER.HOME').
   * Reactivo: el TranslatePipe (pure:false) lo re-ejecuta al cambiar el idioma.
   * Las traducciones están disponibles de forma sincrónica desde el inicio.
   */
  public translate(key: string): string {
    const map = this.currentLang() === 'ES' ? this.translationsES : this.translationsEN;
    const keys = key.split('.');
    let value: any = map;
    for (const k of keys) {
      if (value == null) return key;
      value = value[k];
    }
    return typeof value === 'string' ? value : key;
  }
}

