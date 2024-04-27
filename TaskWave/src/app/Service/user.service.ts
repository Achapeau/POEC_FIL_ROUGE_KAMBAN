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
      token: user.token,
    };
    return User;
  }

  // Connect user
  connectUser(logDTO: LogsDTO) {
    this.http
      .post<User>(this.serviceURL + '/login', logDTO)
      .subscribe((data: User) => {
        this.authService.doLoginUser(logDTO.email, data.token);
        const userMail = this.authService.decodeToken()?.sub;
        this.getUserByEmail(userMail as string).subscribe((user) => {
          this.currentUser = user;
          this.connected = true;
          this.router.navigate(['project-list'], { relativeTo: this.route });
        });
      });
    let Log = this.authService.getToken();

    console.log(Log);
  }

  inscription(User: Partial<User>) {
    this.http
      .post<User>(this.serviceURL + '/register', newUser)
      .subscribe((data: User) => {
        console.log(data);
        this.currentUser = data;
        this.connected = true;
        this.router.navigate(['project-list'], { relativeTo: this.route });
      });
  }

  // Disconnect user
  disconnectUser() {
    this.authService.deleteToken();
    this.currentUser = null;
    this.connected = false;
    this.router.navigate([''], { relativeTo: this.route });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceURL);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.serviceURL + '/email/' + email);
  }
}
