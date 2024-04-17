import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../Model/User';

type LoginResponse = {
  accessToken: string;
} | string;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken: string | null = null;
  user: User | null = null;

  constructor(
    private http: HttpClient
  ) { 
    this.loginFromLocalStorage();
  }

  async loginFromLocalStorage() {
    const accessToken = localStorage.getItem("access_token");
    if(!accessToken)
      return;

    this.accessToken = accessToken;

    const payload = accessToken.split(".")[1];
    const decoded = atob(payload);
    const user = JSON.parse(decoded) as User;
    this.user = user;

    console.log(user);
  }

  async login(email: string, password: string) : Promise<User | string> {
    try {
      const res = await this.http.post<LoginResponse>("/login", {
        email, 
        password
      }).toPromise();

      if(typeof res === 'string' || !res)
        throw new Error(res);

      const payload = res.accessToken.split(".")[1];
      const decoded = atob(payload);
      const user = JSON.parse(decoded) as User;
      console.log(user);

      this.accessToken = res.accessToken;
      this.user = user;

      localStorage.setItem("access_token", res.accessToken);
      console.log(this.accessToken);

      console.log(res);

      return user;
    }
    catch(e: any) {
      if(e instanceof HttpErrorResponse) {
        return e.error;
      }
      else {
        return "An error occured";
      }
    }
  }
}