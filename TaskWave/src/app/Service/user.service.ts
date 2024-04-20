import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User, LogsDTO } from '../Model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  serviceURL = 'http://localhost:3050/user';

  connected: boolean = false;
  currentUser: User | null = null;

  // get user by id

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.serviceURL + '/' + id);
  }
  // update user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.serviceURL + '/' + user.id, user);
  }

  convertUserToUser(user: User): User {
    let User: User = {
      id: user.id,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      projectsIds: user.projectsIds,
    };
    return User;
  }

  // Connect user
  connectUser(logDTO: LogsDTO) {
    this.http
      .post<User>(this.serviceURL + '/login', logDTO)
      .subscribe((data: User) => {
        console.log(data);
        this.currentUser = data;
        this.connected = true;
        this.router.navigate(['project-list'], { relativeTo: this.route });
        this.authService.setToken(
          JSON.stringify({
            mail: this.currentUser.email,
            id: this.currentUser.id,
          })
        );
        this.authService.setUserData(data);
      });
  }
  inscription(User: Partial<User>) {
    this.http
      .post<User>(this.serviceURL + '/register', User)
      .subscribe((data: User) => {
        console.log(data);
        this.currentUser = data;
        this.connected = true;
        this.router.navigate(['project-list'], { relativeTo: this.route });
      });
  }

  // Disconnect user
  disconnectUser() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.connected = false;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }
}
