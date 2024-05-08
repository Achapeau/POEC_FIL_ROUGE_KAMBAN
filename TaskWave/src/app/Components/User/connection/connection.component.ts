import { Component } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogsDTO } from '../../../Model/model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css',
})
export class ConnectionComponent {
  constructor(
    public user: UserService,
    public fb: FormBuilder,
    public authService: AuthService
  ) {}

  public connectionForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    console.log("step 1: validate btn clicked");
    
    let user: LogsDTO = {
      email: this.connectionForm.value.email as string,
      password: this.connectionForm.value.password as string,
    };
    this.user.connectUser(user);
    console.log("Last step: is the user logged? ", this.authService.isLoggedIn());

    // this.authService.signIn(user);
  }
}
