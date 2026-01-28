import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="dashboard-container">
      <h2>DASHBOARD</h2>
      <div class="welcome-banner pk-card">
        <h3>WELCOME TRAINER!</h3>
        <p>Ready to manage the league?</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card pk-card">
          <h4>CAUGHT</h4>
          <p class="value">151</p>
        </div>
        <div class="stat-card pk-card">
          <h4>SEEN</h4>
          <p class="value">151</p>
        </div>
        <div class="stat-card pk-card">
          <h4>BADGES</h4>
          <p class="value">8</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard-container { padding: 20px; }
    .welcome-banner {
      padding: 20px;
      background: linear-gradient(to right, #FFFFFF, #F0F0F0);
      margin-bottom: 20px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .stat-card {
      padding: 20px;
      text-align: center;
    }
    .value {
      font-size: 32px;
      font-weight: bold;
      color: var(--pk-blue);
      margin: 10px 0 0 0;
    }
  `]
})
export class DashboardComponent { }
