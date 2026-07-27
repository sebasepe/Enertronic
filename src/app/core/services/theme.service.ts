import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Default to dark mode for a modern industrial tech feel, configurable via signal
  public readonly isDarkMode = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('enertronic_theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        // System preference default
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }

      effect(() => {
        const isDark = this.isDarkMode();
        if (isDark) {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');
          localStorage.setItem('enertronic_theme', 'dark');
        } else {
          document.body.classList.add('light-theme');
          document.body.classList.remove('dark-theme');
          localStorage.setItem('enertronic_theme', 'light');
        }
      });
    }
  }

  public toggleTheme(): void {
    this.isDarkMode.update((prev) => !prev);
  }
}
