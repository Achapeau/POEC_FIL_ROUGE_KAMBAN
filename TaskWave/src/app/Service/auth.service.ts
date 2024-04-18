import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from '../Model/UserDTO';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }  
    private userDataSubject: BehaviorSubject<Partial<UserDTO>> = new BehaviorSubject<Partial<UserDTO>>({} as UserDTO);
    userData$: Observable<Partial<UserDTO>> = this.userDataSubject.asObservable();

    setUserData(userData: UserDTO): void {
        const filteredUserData = {
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            projectsIds: userData.projectsIds
        }
        console.log(userData);
        
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