import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Model/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private userDataSubject: BehaviorSubject<Partial<User>> = new BehaviorSubject<
    Partial<User>
  >({} as User);
  private usersDataSubject: BehaviorSubject<Partial<User>[]> =
    new BehaviorSubject<Partial<User>[]>({} as User[]);
  userData$: Observable<Partial<User>> = this.userDataSubject.asObservable();
  usersData$: Observable<Partial<User>[]> =
    this.usersDataSubject.asObservable();

  setUserData(userData: User): void {
    const filteredUserData = {
      id: userData.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      projectsIds: userData.projectsIds,
    };
    this.userDataSubject.next(filteredUserData);
  }

  setUsersData(usersData: User[]): void {
    const filteredUsersData = usersData.map((user) => {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        projectsIds: user.projectsIds,
      };
    });
    this.usersDataSubject.next(filteredUsersData);
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
