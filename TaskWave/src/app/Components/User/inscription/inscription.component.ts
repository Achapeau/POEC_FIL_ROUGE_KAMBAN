import { Component } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User} from '../../../Model/model';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
	constructor(public userService: UserService, public fb : FormBuilder) { }

	public connectionForm = this.fb.group({
		name: ['', [Validators.required]],
		password: ['', [Validators.required]],
		email: ['', [Validators.required]],
		firstname: ['', [Validators.required]],
		lastname: ['', [Validators.required]],
	});

	onSubmit() {
			if (this.connectionForm.valid) {
			console.log(this.connectionForm.value);

			let user : Partial<User> = {
				id : 0,
				email : this.connectionForm.value.email as string,
				password : this.connectionForm.value.password 	as string,
				firstname : this.connectionForm.value.firstname 	as string,
				lastname : this.connectionForm.value.lastname as string,
				projectsIds : []
			};

			this.userService.inscription(user);
		}
	}

}
