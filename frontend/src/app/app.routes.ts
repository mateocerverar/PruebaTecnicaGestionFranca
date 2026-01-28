import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './core/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PokemonListComponent } from './features/pokemon-list/pokemon-list.component';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pokedex', component: PokemonListComponent },
            {
                path: 'teams',
                loadComponent: () => import('./features/teams/teams.component').then(m => m.TeamsComponent),
                canActivate: [adminGuard]
            },
            {
                path: 'trainers',
                loadComponent: () => import('./features/trainers/trainers.component').then(m => m.TrainersComponent),
                canActivate: [adminGuard]
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
