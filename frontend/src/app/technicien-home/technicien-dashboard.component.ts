import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-technicien-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de bord - Technicien</h1>
      
      <div class="welcome-section" *ngIf="auth.user() as user">
        <h2>Bienvenue, {{ user.firstname }} {{ user.lastname }}</h2>
        <p>Aéroport ID: {{ user.aeroportId }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Interventions en cours</h3>
          <div class="stat-number">5</div>
        </div>
        
        <div class="stat-card">
          <h3>Interventions planifiées</h3>
          <div class="stat-number">12</div>
        </div>
        
        <div class="stat-card">
          <h3>Interventions terminées</h3>
          <div class="stat-number">38</div>
        </div>
      </div>
      
      <div class="recent-section">
        <h3>Interventions récentes</h3>
        <div class="intervention-list">
          <div class="intervention-item">
            <span class="status ongoing">En cours</span>
            <span class="description">Maintenance équipement Zone A</span>
            <span class="date">Aujourd'hui</span>
          </div>
          <div class="intervention-item">
            <span class="status scheduled">Planifiée</span>
            <span class="description">Inspection comptoir 12</span>
            <span class="date">Demain</span>
          </div>
          <div class="intervention-item">
            <span class="status completed">Terminée</span>
            <span class="description">Réparation système d'éclairage</span>
            <span class="date">Hier</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
      text-align: center;
    }

    .welcome-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      text-align: center;
    }

    .welcome-section h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      border: 1px solid #e3e8ef;
    }

    .stat-card h3 {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 1rem 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2c3e50;
    }

    .recent-section h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .intervention-list {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .intervention-item {
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 1rem;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #f0f0f0;
      align-items: center;
    }

    .intervention-item:last-child {
      border-bottom: none;
    }

    .status {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      text-align: center;
    }

    .status.ongoing {
      background: #fff3cd;
      color: #856404;
    }

    .status.scheduled {
      background: #d1ecf1;
      color: #0c5460;
    }

    .status.completed {
      background: #d4edda;
      color: #155724;
    }

    .description {
      font-weight: 500;
      color: #2c3e50;
    }

    .date {
      color: #666;
      font-size: 0.9rem;
    }

    /* Dark mode support */
    :host-context(.dark) .stat-card,
    :host-context(.dark) .intervention-list {
      background: #2d3748;
      color: white;
    }

    :host-context(.dark) h1,
    :host-context(.dark) .recent-section h3,
    :host-context(.dark) .stat-number,
    :host-context(.dark) .description {
      color: white;
    }

    :host-context(.dark) .stat-card h3 {
      color: #a0aec0;
    }

    :host-context(.dark) .intervention-item {
      border-bottom-color: #4a5568;
    }
  `]
})
export class TechnicienDashboardComponent {
  constructor(public auth: AuthService) {}
}
