import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="pk-card login-card">
        <div class="pokeball-decoration"></div>
        <h2>TRAINER LOGIN</h2>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>USERNAME</label>
            <input type="text" [(ngModel)]="username" name="username" placeholder="Ash / Brock" required>
          </div>
          
          <div class="form-group">
            <label>PASSWORD</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="******" required>
          </div>

          <div *ngIf="error" class="error-msg">
            {{ error }}
          </div>

          <button type="submit" class="pk-btn full-width">START ADVENTURE</button>
        </form>
        
        <div class="hints">
          <p>Hint: Use <b>admin</b> or <b>user</b></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .login-card {
      width: 350px;
      padding: 40px;
      text-align: center;
      position: relative;
      background: #fafafa;
    }
    .pokeball-decoration {
      width: 60px;
      height: 60px;
      background: linear-gradient(to bottom, var(--pk-red) 50%, white 50%);
      border: 4px solid var(--pk-blue);
      border-radius: 50%;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
    }
    .pokeball-decoration::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: white;
      border: 4px solid var(--pk-blue);
      border-radius: 50%;
    }
    h2 {
      margin-top: 20px;
      margin-bottom: 30px;
      font-size: 18px;
    }
    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }
    label {
      display: block;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      margin-bottom: 8px;
      color: var(--pk-blue);
    }
    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ccc;
      font-family: 'Roboto', sans-serif;
      box-sizing: border-box;
    }
    input:focus {
      border-color: var(--pk-blue);
      outline: none;
    }
    .full-width {
      width: 100%;
      margin-top: 10px;
    }
    .error-msg {
      color: var(--pk-red);
      font-size: 12px;
      margin-bottom: 10px;
      font-family: 'Press Start 2P';
    }
    .hints {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.password) {
      this.error = 'Password is required!';
      return;
    }
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid credentials!';
      }
    });
  }
}
