import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Model/model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }  
    private userDataSubject: BehaviorSubject<Partial<User>> = new BehaviorSubject<Partial<User>>({} as User);
    userData$: Observable<Partial<User>> = this.userDataSubject.asObservable();

    setUserData(userData: User): void {
        const filteredUserData = {
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            projectsIds: userData.projectsIds
        }
        this.userDataSubject.next(filteredUserData);
    }

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