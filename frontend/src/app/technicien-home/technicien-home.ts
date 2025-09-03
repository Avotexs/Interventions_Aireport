// src/app/technicien-home/technicien-home.ts
import { Component, OnInit, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../services/auth';
import { LangService } from '../services/lang.service';
import { DarkModeService } from '../services/dark.service';

@Component({
  selector: 'app-technicien-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './technicien-home.html',
  styleUrls: ['./technicien-home.css'],
  // Important pour réutiliser facilement des classes globales et éviter
  // l'encapsulation qui pourrait casser le style du layout :
  encapsulation: ViewEncapsulation.None
})
export class TechnicienHomeComponent implements OnInit {
  sidebarVisible = true;
  window = window;

  constructor(
    public auth: AuthService,
    public langService: LangService,
    public darkModeService: DarkModeService
  ) {}

  ngOnInit() {
    this.updateSidebarClass();
  }

  // ======== i18n / thème ========
  toggleLang() { this.langService.toggleLang(); }
  get t() { return this.langService.t; }
  get lang() { return this.langService.lang; }
  get darkMode(): boolean { return this.darkModeService.isDarkMode; }
  toggleDarkMode() { this.darkModeService.toggleDarkMode(); }

  // ======== user ========
  user = computed(() => this.auth.user());
  fullName = computed(
    () => `${this.user()?.firstname ?? ''} ${this.user()?.lastname ?? ''}`.trim()
  );
  aeroportId = computed(() => this.user()?.aeroportId ?? null);

  // ======== sidebar ========
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
}
