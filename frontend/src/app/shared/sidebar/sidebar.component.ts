import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="profile-section">
        <div class="avatar">
           <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Avatar">
        </div>
        <div class="info" *ngIf="user$ | async as user">
          <p class="name">{{ user.username }}</p>
          <p class="role">LVL: {{ user.role }}</p>
        </div>
      </div>

      <nav class="menu">
        <a routerLink="/dashboard" routerLinkActive="active" class="menu-item">
          <span>DASHBOARD</span>
        </a>
        <a routerLink="/pokedex" routerLinkActive="active" class="menu-item">
          <span>POKEDEX</span>
        </a>
        <a *ngIf="isAdmin" routerLink="/teams" routerLinkActive="active" class="menu-item locked">
          <span>MY TEAMS</span>
        </a>
        <a *ngIf="isAdmin" routerLink="/trainers" routerLinkActive="active" class="menu-item locked">
          <span>TRAINERS</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="menu-item locked">
          <span>SETTINGS</span>
        </a>
      </nav>

      <div class="logout-section">
        <button (click)="logout()" class="pk-btn full-width">LOGOUT</button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: var(--pk-dark-red);
      display: flex;
      flex-direction: column;
      border-right: 4px solid var(--pk-blue);
      color: white;
    }
    .profile-section {
      padding: 20px;
      background: var(--pk-red);
      display: flex;
      align-items: center;
      border-bottom: 4px solid var(--pk-dark-red);
    }
    .avatar img {
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50%;
      border: 2px solid var(--pk-blue);
      margin-right: 15px;
    }
    .name {
      font-family: 'Press Start 2P';
      font-size: 10px;
      margin: 0 0 5px 0;
    }
    .role {
      font-size: 10px;
      opacity: 0.8;
      margin: 0;
    }
    .menu {
      flex: 1;
      padding: 20px 0;
    }
    .menu-item {
      display: block;
      padding: 15px 20px;
      color: white;
      text-decoration: none;
      font-family: 'Press Start 2P';
      font-size: 10px;
      transition: background 0.2s;
    }
    .menu-item:hover {
      background: rgba(255,255,255,0.1);
    }
    .menu-item.active {
      background: var(--pk-yellow);
      color: var(--pk-blue);
      box-shadow: 4px 0 0 var(--pk-blue) inset;
    }
    .logout-section {
      padding: 20px;
      background: var(--pk-red);
      border-top: 4px solid var(--pk-dark-red);
    }
    .full-width {
      width: 100%;
    }
  `]
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  user$ = this.authService.currentUser$;
  isAdmin = false;

  constructor() { }

  ngOnInit() {
    this.user$.subscribe((user: User | null) => {
      this.isAdmin = user?.role === 'Admin';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
