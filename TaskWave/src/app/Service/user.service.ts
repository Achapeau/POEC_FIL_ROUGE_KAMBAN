import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User, LogsDTO } from '../Model/model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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

  // inscription(User: Partial<User>) {
  //   this.http
  //     .post<User>(this.serviceURL + '/register', User)
  //     .subscribe((data: User) => {
  //       console.log(data);
  //       this.currentUser = data;
  //       this.connected = true;
  //       this.custommer = {
  //         email: this.currentUser.email,
  //         password: this.currentUser.password,
  //       }
  //     });
  //     this.authService.signIn(this.custommer as LogsDTO);
      

  //   this.router.navigate(['project-list'], { relativeTo: this.route });
  // }

  // Disconnect user
  // disconnectUser() {
  //   this.authService.deleteToken();
  //   this.currentUser = null;
  //   this.connected = false;
  //   this.router.navigate([''], { relativeTo: this.route });
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.serviceURL + '/email/' + email);
  }
}
