import { Component } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../Model/model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent {
  constructor(public userService: UserService, public fb: FormBuilder) {}

  public connectionForm = this.fb.group({
    // name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
  });

  onSubmit(event: Event) {
    // event.preventDefault();
    if (this.connectionForm.valid) {
      console.log(this.connectionForm.value);

      let user: Partial<User> = {
        id: 0,
        email: this.connectionForm.value.email as string,
        password: this.connectionForm.value.password as string,
        firstname: this.connectionForm.value.firstname as string,
        lastname: this.connectionForm.value.lastname as string,
        projectsIds: [],
      };

      this.userService.inscription(user);
    } else {
      let alerts = [];
      let mail = '';
      if (this.connectionForm.controls['password'].invalid) {
        alerts.push('Mot de passe');
      }
      if (this.connectionForm.controls['firstname'].invalid) {
        alerts.push(' Prénom');
      }
      if (this.connectionForm.controls['lastname'].invalid) {
        alerts.push(' Nom');
      }
      if (this.connectionForm.controls['email'].invalid) {
        if (this.connectionForm.controls['email'].hasError('email')) {
          mail = 'Le champ Email est invalide.';
        } else {
          alerts.push(' Email');
        }
      }
      if (alerts.length > 0 && mail != '') {
        alert(`Le ou les champs suivants sont requis: ${alerts}. ${mail}`);
      } else if (alerts.length > 0) {
        alert(`Le ou les champs suivants sont requis: ${alerts}`);
      } else {
        alert(mail);
      }
    }
  }
}
