import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Token, User } from '../Model/model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3050';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

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

  signUp(user: User): Observable<Partial<User>> {	
    return this.http.post(`${this.endpoint}/register`, user).pipe(catchError(this.handleError));
  }

  signIn(user: User): Observable<Partial<User>> {
    return this.http
      .post<Partial<User>>(`${this.endpoint}/login`, user)
      .pipe(
        tap((res: Partial<User>) => {
          if (res.token) {            
            this.setToken(res.token);
            this.router.navigate(['project-list']);
          }      
        })
    )
  }


  setToken(token: Token): void {

    localStorage.setItem('currentUser', JSON.stringify(token));
  }

  getToken(): string | null {
    return localStorage.getItem('currentUser');
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  deleteToken(): void {
    localStorage.removeItem('currentUser');
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }  
  
}
