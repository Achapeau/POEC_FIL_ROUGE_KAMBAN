import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }  

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    deleteToken(): void {
        localStorage.removeItem('token');
    }
}