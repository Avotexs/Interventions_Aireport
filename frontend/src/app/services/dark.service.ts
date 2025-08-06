import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initDarkMode();
  }

  /**
   * Initialise le mode sombre en fonction des préférences utilisateur
   */
  private initDarkMode() {
    // Vérifier d'abord les préférences sauvegardées
    const savedPreference = localStorage.getItem('darkMode');
    
    if (savedPreference !== null) {
      const isDark = savedPreference === 'true';
      this.darkMode.next(isDark);
      this.applyTheme(isDark);
    } else {
      // Sinon, vérifier les préférences système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode.next(prefersDark);
      this.applyTheme(prefersDark);
    }

    // Écouter les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // Ne pas appliquer automatiquement si l'utilisateur a une préférence explicite
      if (localStorage.getItem('darkMode') === null) {
        this.darkMode.next(e.matches);
        this.applyTheme(e.matches);
      }
    });
  }

  /**
   * Bascule entre le mode clair et le mode sombre
   */
  toggleDarkMode() {
    const newValue = !this.darkMode.value;
    this.darkMode.next(newValue);
    localStorage.setItem('darkMode', String(newValue));
    this.applyTheme(newValue);
  }

  /**
   * Applique le thème à tout le document
   */
  private applyTheme(isDark: boolean) {
    if (isDark) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  /**
   * Obtient l'état actuel du mode sombre
   */
  get isDarkMode(): boolean {
    return this.darkMode.value;
  }
}