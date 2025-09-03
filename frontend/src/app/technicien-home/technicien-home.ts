// src/app/technicien-home/technicien-home.component.ts
import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-technicien-home',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="page">
    <h2>Bienvenue technicien {{ fullName() }}</h2>
    <p>Aéroport ID : {{ aeroportId() ?? '—' }}</p>
    <p>Tu peux consulter tes interventions ici (à implémenter) ✈️</p>
  </div>`,
  styles:[`.page{padding:24px}`]
})
export class TechnicienHomeComponent {
  constructor(private auth: AuthService) {}
  user = computed(()=> this.auth.user());
  fullName = computed(()=> `${this.user()?.firstname ?? ''} ${this.user()?.lastname ?? ''}`.trim());
  aeroportId = computed(()=> this.user()?.aeroportId ?? null);
}
