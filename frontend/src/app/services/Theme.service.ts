import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _darkMode = false;

  get darkMode() {
    return this._darkMode;
  }

  toggleTheme() {
    this._darkMode = !this._darkMode;
    if (this._darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}