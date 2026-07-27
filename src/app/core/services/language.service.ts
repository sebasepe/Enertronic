import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'ES' | 'EN';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  public readonly currentLang = signal<Language>('ES');

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
}
