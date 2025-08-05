import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LangService } from './services/lang.service';
import { DarkModeService } from './services/dark.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  sidebarVisible = true;

  constructor(
    public langService: LangService,
    public darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    // La logique d'initialisation est gérée par le service
  }

  toggleLang() {
    this.langService.toggleLang();
  }

  get t() {
    return this.langService.t;
  }
  
  get lang() {
    return this.langService.lang;
  }

  // Getter pour obtenir l'état du mode sombre
  get darkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }
  
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    document.body.classList.toggle('sidebar-collapsed');
  }

  // Méthode pour basculer le mode sombre
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}