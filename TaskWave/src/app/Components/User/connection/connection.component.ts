import { Component } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogsDTO } from '../../../Model/LogsDTO';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css'
})
export class ConnectionComponent {

	constructor(public user: UserService, public fb : FormBuilder) { }

	public connectionForm = this.fb.group({
		email: ['', [Validators.required]],
		password: ['', [Validators.required]]
	});

	onSubmit() {
		console.log(this.connectionForm.value);

		let user : LogsDTO = {
			email: this.connectionForm.value.email,
			password: this.connectionForm.value.password
		}

		this.user.connectUser(user);

	}

}
