import { Component, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WrapperService } from '../../Service/wrapper.service';
import { WrapperDTO } from '../../Model/WrapperDTO';
@Component({
  selector: 'app-wrapper-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './wrapper-create.component.html',
  styleUrl: './wrapper-create.component.css'
})
export class WrapperCreateComponent {
  newTitle!: string | null;
  projectId : number = this.wrapperService.projectId;
	constructor(public wrapperService : WrapperService, public fb : FormBuilder) {
    console.log("project id = " + this.projectId);
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

	onSubmit() {
    if (this.checkoutForm.valid) {
      let newWrapper : WrapperDTO = {
        title: this.checkoutForm.value.newTitle,
        projectId: this.projectId
      }
      this.wrapperService.addWrapper(newWrapper);
      this.checkoutForm.reset();
    }
	}
}
