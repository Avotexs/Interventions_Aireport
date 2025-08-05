import { Component } from '@angular/core';
import { LangService } from '../services/lang.service'
import { ThemeService } from '../services/Theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule] ,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
  constructor(public langService: LangService, public themeService: ThemeService) {}

  toggleLang() {
    this.langService.toggleLang();
  }

  get lang() {
    return this.langService.lang;
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get darkMode() {
    return this.themeService.darkMode;
  }
}