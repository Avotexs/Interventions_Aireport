import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LangService } from './services/lang.service';
import { DarkModeService } from './services/dark.service';
import { AuthService } from './services/auth'; // <-- AJOUT

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
  window = window;

  constructor(
    public langService: LangService,
    public darkModeService: DarkModeService,
    public auth: AuthService             // <-- AJOUT
  ) {}

  ngOnInit() {
    this.updateSidebarClass();
  }

  toggleLang() { this.langService.toggleLang(); }
  get t() { return this.langService.t; }
  get lang() { return this.langService.lang; }
  get darkMode(): boolean { return this.darkModeService.isDarkMode; }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.updateSidebarClass();
  }

  private updateSidebarClass() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (window.innerWidth <= 768) {
      if (this.sidebarVisible) { sidebar?.classList.add('mobile-open'); overlay?.classList.add('active'); }
      else { sidebar?.classList.remove('mobile-open'); overlay?.classList.remove('active'); }
    } else {
      if (this.sidebarVisible) document.body.classList.remove('sidebar-collapsed');
      else document.body.classList.add('sidebar-collapsed');
    }
  }

  toggleDarkMode() { this.darkModeService.toggleDarkMode(); }
}
