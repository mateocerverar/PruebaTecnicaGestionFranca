import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-container">
      <h2>TRAINERS MANAGEMENT</h2>
      <table class="pk-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>BADGES</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ash Ketchum</td>
            <td>8</td>
            <td class="active">ACTIVE</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Gary Oak</td>
            <td>10</td>
            <td class="active">ACTIVE</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Misty</td>
            <td>4</td>
            <td class="inactive">INACTIVE</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .content-container { padding: 20px; }
    .pk-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border: 4px solid var(--pk-blue);
      color: var(--pk-text);
    }
    :host-context(.dark-mode) .pk-table {
      background-color: #1E1E1E !important; 
      border-color: #555 !important;
      color: #E0E0E0 !important;
    }
    :host-context(.dark-mode) th {
      background-color: #333 !important;
      color: var(--pk-yellow) !important;
      border: 1px solid #555;
    }
    :host-context(.dark-mode) td {
      border-bottom-color: #444 !important;
      color: #E0E0E0 !important;
      background-color: #1E1E1E !important;
    }
    th {
      background: var(--pk-blue);
      color: white;
      padding: 10px;
      font-family: 'Press Start 2P';
      font-size: 10px;
      text-align: left;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .active { color: #78C850; font-weight: bold; }
    .inactive { color: var(--pk-red); font-weight: bold; }
  `]
})
export class TrainersComponent { }
