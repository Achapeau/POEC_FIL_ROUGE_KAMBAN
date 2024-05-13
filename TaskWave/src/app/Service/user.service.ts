import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User, LogsDTO } from '../Model/model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}

  serviceURL = 'http://localhost:3050/user';

  connected: boolean = false;
  currentUser: User | null = null;
  custommer: LogsDTO | null = null;

  // get user by id

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.serviceURL + '/' + id);
  }
  // update user
  updateUser(user: Partial<User>): Observable<User> {
    return this.http.put<User>(this.serviceURL + '/' + user.id, user);
  }

  convertUserToUser(user: User): User {
    let User: User = {
      id: user.id,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      icon: user.icon,
      projectsIds: user.projectsIds,
    };
    return User;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.serviceURL + '/email/' + email);
  }
}
