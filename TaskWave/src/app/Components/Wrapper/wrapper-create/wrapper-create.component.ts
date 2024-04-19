import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WrapperService } from '../../../Service/wrapper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Wrapper } from '../../../Model/Wrapper';
import { ProjectService } from '../../../Service/project.service';
import { Card } from '../../../Model/Card';
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
  @Input() cardList : Card[] = [];
	constructor(private wrapperService : WrapperService, private projectService : ProjectService, public fb : FormBuilder) {
    
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

  ngOnInit() : void {
    this.projectId = this.projectService.project.id;
    this.wrapperList = this.projectService.wrappers;
  }

	onSubmit() {
    if (this.checkoutForm.valid) {
      let newWrapper : Partial<Wrapper> = {
        title: this.checkoutForm.value.newTitle,
        position: this.wrapperList.length,
        projectId: this.projectId
      }
      this.wrapperService.addWrapper(newWrapper).subscribe((data : Wrapper) => {
        let returnWrapper = data;
        this.wrapperList = this.projectService.wrappers;
        this.wrapperList.push(returnWrapper);
        this.projectService.wrappers = this.wrapperList;
      });
      this.checkoutForm.reset();
    }
	}
}
