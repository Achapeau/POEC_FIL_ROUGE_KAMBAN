import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WrapperService } from '../../../Service/wrapper.service';
import { WrapperDTO } from '../../../Model/WrapperDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { Wrapper } from '../../../Model/Wrapper';
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
	constructor(public wrapperService : WrapperService, public fb : FormBuilder, private router : Router, private route : ActivatedRoute) {
    
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

  ngOnInit() : void {
    console.log("project id = " + this.projectId);
    console.log("this.wrapperList = " + this.wrapperList);
    console.log("this.wrapperService.wrappers = " + this.wrapperService.wrappers);
  }

	onSubmit() {
    if (this.checkoutForm.valid) {
      let newWrapper : WrapperDTO = {
        title: this.checkoutForm.value.newTitle,
        projectId: this.projectId
      }
      this.wrapperService.addWrapper(newWrapper).subscribe((data : Wrapper) => {
        let returnWrapper = data;
        this.wrapperList.push(returnWrapper);
      });
      this.checkoutForm.reset();
    }
	}
}
