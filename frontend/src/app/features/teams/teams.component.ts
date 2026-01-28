import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-teams',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="content-container">
      <h2>MY TEAMS</h2>
      <div class="pk-card">
        <h3>Team Rocket</h3>
        <p>Members: Jessie, James, Meowth</p>
      </div>
      <div class="pk-card" style="margin-top: 20px;">
        <h3>Ash's Team</h3>
        <p>Pikachu, Charizard, Greninja</p>
      </div>
    </div>
  `,
    styles: [`
    .content-container { padding: 20px; }
    .pk-card { padding: 20px; }
  `]
})
export class TeamsComponent { }
