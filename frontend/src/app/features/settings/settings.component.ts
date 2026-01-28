import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="content-container">
      <h2>SETTINGS</h2>
      <div class="pk-card">
        <label class="switch-container">
          <span>Enable Sound</span>
          <input type="checkbox" checked>
        </label>
        <hr>
        <label class="switch-container">
          <span>Notifications</span>
          <input type="checkbox">
        </label>
      </div>
    </div>
  `,
    styles: [`
    .content-container { padding: 20px; }
    .pk-card { padding: 20px; }
    .switch-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      cursor: pointer;
    }
    hr {
      border: 0;
      border-top: 1px solid #eee;
      margin: 10px 0;
    }
  `]
})
export class SettingsComponent { }
