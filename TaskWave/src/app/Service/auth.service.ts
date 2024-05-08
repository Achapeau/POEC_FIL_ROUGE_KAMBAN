import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LogsDTO, Token, User } from '../Model/model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:3050/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  public loggedUser!: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

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

  signUp(user: User): Observable<Partial<User>> {
    return this.http
      .post(`${this.endpoint}/register`, user)
      .pipe(catchError(this.handleError));
  }

  // signIn(LogsDTO: LogsDTO): Observable<Partial<User>> {
  //   console.log('step 3: service signIn() called, with user :', LogsDTO);    
  //   const value = this.http
  //     .post<Partial<User>>(`${this.endpoint}/login`, LogsDTO)      
  //     .pipe(
  //       tap((res: Partial<User>) => {
  //         if (res) {
  //           console.log(res);            
  //         }
  //         if (res.token) {
  //           console.log(res);
  //           this.router.navigate(['project-list']);
  //           this.doLoginUser(LogsDTO.email, res.token);
  //         }
  //       })
  //     );
  //   console.log(value);
  //   return value;
  // }

  signIn(LogsDTO: LogsDTO) {
    console.log('step 3: service signIn() called, with user :', LogsDTO);
    this.http.post<Partial<User>>(`${this.endpoint}/login`, LogsDTO).subscribe((data: Partial<User>) => {
      console.log('step 4: Get user data', data);
      this.doLoginUser(data.email as string, data.token as Token);
      console.log('step 6: try to navigate on project-list');
      this.router.navigate(['project-list']);      
    })
  }

  public doLoginUser(email: string, token: Token) {
    console.log('step 5: Trying to login user', email, token);

    this.loggedUser = email;
    this.setToken(token);
    if (this.getToken()?.length) {
      console.log('token pushed to local storage');
    } else {

      console.log('setToken failed');
    }

    this.isAuthenticatedSubject.next(true);
  }

  getCurrentAuthUser() {
    return this.http.get(`${this.endpoint}/user/${this.currentUser}`);
  }

  isTokenExpired() {
    const tokens = this.getToken();
    if (!tokens) return true;
    const token = JSON.parse(tokens).token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();
    return expirationDate < now;
  }

  refreshToken() {
    let tokens: any = this.getToken();
    if (!tokens) return true;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_Token;
    return this.http
      .post<Partial<Token>>(`${this.endpoint}/refresh-token`, {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.setToken(tokens)));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: Token): void {
    localStorage.setItem('currentUser', JSON.stringify(token));
  }

  getToken(): string | null {
    return localStorage.getItem('currentUser');
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

  logout() {
    this.deleteToken();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['login']);
  }

  decodeToken() {
    return this.getToken() ? jwtDecode(this.getToken() as string) : null;
  }
}
