import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export type Language = 'ES' | 'EN';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);

  public readonly currentLang = signal<Language>('ES');

  /** Mapas de traducción cargados desde assets/i18n/ */
  private translationsES: Record<string, any> = {};
  private translationsEN: Record<string, any> = {};

  constructor() {
    // Cargar ambos archivos JSON al iniciar (probando assets/i18n/ e i18n/)
    this.loadTranslationFile('assets/i18n/es.json', 'i18n/es.json', (data) => (this.translationsES = data));
    this.loadTranslationFile('assets/i18n/en.json', 'i18n/en.json', (data) => (this.translationsEN = data));


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

  private loadTranslationFile(
    primaryPath: string,
    fallbackPath: string,
    onSuccess: (data: Record<string, any>) => void
  ): void {
    this.http.get<Record<string, any>>(primaryPath).subscribe({
      next: (data) => onSuccess(data),
      error: () => {
        this.http.get<Record<string, any>>(fallbackPath).subscribe({
          next: (data) => onSuccess(data),
          error: (err) => {
            if (isPlatformBrowser(this.platformId)) {
              console.warn(`No se pudo cargar la traducción desde ${primaryPath} ni ${fallbackPath}`, err);
            }
          },
        });
      },
    });
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
