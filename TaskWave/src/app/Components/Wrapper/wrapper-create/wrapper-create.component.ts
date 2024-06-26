import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper, Card } from '../../../Model/model';
import { ProjectService } from '../../../Service/project.service';
@Component({
  selector: 'app-wrapper-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './wrapper-create.component.html',
  styleUrl: './wrapper-create.component.css'
})
export class WrapperCreateComponent implements OnInit {
  @Input() newTitle!: string | null;
  @Input() projectId : number = this.wrapperService.projectId;
  @Input() wrappersList : Wrapper[] = [];
  @Input() cardList : Card[] = [];
	constructor(private wrapperService : WrapperService, private projectService : ProjectService, public fb : FormBuilder) {
    
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

  ngOnInit() : void {
    this.projectId = this.projectService.project.id;
    this.wrappersList = this.projectService.wrappers;
  }

	onSubmit() {
    if (this.checkoutForm.valid) {
      this.wrappersList = this.projectService.wrappers;
      let newWrapper : Partial<Wrapper> = {
        title: this.checkoutForm.value.newTitle as string,
        position: this.wrappersList.length,
        projectId: this.projectId
      }
      this.wrapperService.addWrapper(newWrapper).subscribe((data : Wrapper) => {
        let returnWrapper = data;
        this.wrappersList = this.projectService.wrappers;
        this.wrappersList.push(returnWrapper);

        this.projectService.wrappers = this.wrappersList;
      });
      this.checkoutForm.reset();
    }
	}
}
