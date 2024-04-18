import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }  

    setToken(token: string): void {
        localStorage.setItem('currentUser', token);
    }

    getToken(): string | null {
        return localStorage.getItem('currentUser');
    }

    deleteToken(): void {
        localStorage.removeItem('currentUser');
    }
}