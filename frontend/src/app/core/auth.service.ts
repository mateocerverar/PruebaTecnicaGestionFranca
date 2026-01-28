import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
    username: string;
    role: 'Admin' | 'User';
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Check localStorage for persisted session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(username: string, password?: string): Observable<boolean> {
        let user: User | null = null;

        if (username.toLowerCase() === 'admin' && password === 'admin123') {
            user = { username: 'Ash Ketchum', role: 'Admin' };
        } else if (username.toLowerCase() === 'user' && password === 'user123') {
            user = { username: 'Brock', role: 'User' };
        }

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return of(true);
        }
        return of(false);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getUserRole(): string | undefined {
        return this.currentUserSubject.value?.role;
    }
}
