import { Component } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogsDTO } from '../../../Model/model';

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
			email: this.connectionForm.value.email as string,
			password: this.connectionForm.value.password as string
		}

		this.user.connectUser(user);

	}

}
