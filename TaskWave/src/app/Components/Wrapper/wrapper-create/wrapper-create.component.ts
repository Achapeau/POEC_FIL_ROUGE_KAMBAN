import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WrapperService } from '../../../Service/wrapper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Wrapper } from '../../../Model/Wrapper';
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
  @Input() wrapperList : Wrapper[] = [];
	constructor(private wrapperService : WrapperService, private projectService : ProjectService, public fb : FormBuilder, private router : Router, private route : ActivatedRoute) {
    
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

  ngOnInit() : void {
    this.projectId = this.projectService.project.id;
    console.log("project id = " + this.projectId);
    console.log("this.wrapperList = " + this.wrapperList);
    console.log("this.wrapperService.wrappers = " + this.wrapperService.wrappers);
  }

	onSubmit() {
    if (this.checkoutForm.valid) {
      let newWrapper : Partial<Wrapper> = {
        title: this.checkoutForm.value.newTitle,
        projectId: this.projectId
      }
      console.log(newWrapper);
      this.wrapperService.addWrapper(newWrapper).subscribe((data : Wrapper) => {
        let returnWrapper = data;
        this.wrapperList = this.projectService.wrappers;
        this.wrapperList.push(returnWrapper);
      });
      this.checkoutForm.reset();
    }
	}
}
