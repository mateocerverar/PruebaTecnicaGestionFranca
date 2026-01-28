import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, SidebarComponent],
    template: `
    <div class="app-layout" [class.dark-mode]="isDarkMode">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <header class="top-bar">
          <h1 class="page-title">POKE-APP</h1>
          <button class="pk-btn toggle-btn" (click)="toggleDarkMode()">
             {{ isDarkMode ? 'LIGHT MODE' : 'DARK MODE' }}
          </button>
        </header>
        <div class="content-scroll">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      transition: background-color 0.3s, color 0.3s;
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .top-bar {
      height: var(--header-height);
      background: white;
      border-bottom: 4px solid var(--pk-blue);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    .page-title {
      font-size: 16px;
      margin: 0;
    }
    .content-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    /* Dark Mode Overrides */
    .app-layout.dark-mode {
      --pk-bg: #1a1a1a;
      --pk-text: #f0f0f0;
      background-color: var(--pk-bg);
      color: var(--pk-text);
    }
    .app-layout.dark-mode .top-bar {
      background: #2a2a2a;
      border-bottom-color: var(--pk-yellow);
    }
    .app-layout.dark-mode .page-title {
       color: var(--pk-yellow);
    }
  `]
})
export class MainLayoutComponent {
    isDarkMode = false;

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        // Persist preference optional
    }
}
