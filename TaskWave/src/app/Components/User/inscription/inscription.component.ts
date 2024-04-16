import { Component } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDTO } from '../../../Model/UserDTO';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
	constructor(public user: UserService, public fb : FormBuilder) { }

	public connectionForm = this.fb.group({
		name: ['', [Validators.required]],
		password: ['', [Validators.required]],
		email: ['', [Validators.required]],
		firstname: ['', [Validators.required]],
		lastname: ['', [Validators.required]],
	});

	onSubmit() {
		console.log(this.connectionForm.value);

		let user : UserDTO = {
			id : 0,
			email : this.connectionForm.value.email,
			password : this.connectionForm.value.password,
			firstname : this.connectionForm.value.firstname,
			lastname : this.connectionForm.value.lastname,
      projectsIds : []
		};

		this.user.inscription(user);
	}

}
