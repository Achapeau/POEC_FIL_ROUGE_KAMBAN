import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CardService } from '../../../Service/card.service';
import { Card } from '../../../Model/Card';
import { Wrapper } from '../../../Model/Wrapper';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WrapperService } from '../../../Service/wrapper.service';
import { Router } from '@angular/router';
import { ProjectService } from '../../../Service/project.service';
import { Project } from '../../../Model/Project';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../../Model/TaskStatus';

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './card-new.component.html',
  styleUrl: './card-new.component.css'
  
})
export class CardNewComponent implements OnInit, OnChanges {
  newTitle!: string | null;
  @Input() wrapper! : Wrapper;
  projectId : number = this.wrapperService.projectId;
  @Input() cardList : Card[] = [];
  @Output() cardListChange = new EventEmitter<Card[]>();
  @Input() project! : Project;
  isAddingTask: boolean = false;

	constructor(private projectService : ProjectService, public wrapperService : WrapperService, private cardService : CardService, public fb : FormBuilder, private router : Router) {  }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

  showInput(): void {
    this.isAddingTask = true;
  }

  closeInput(): void {
    this.isAddingTask = false;
  }

  ngOnInit() : void {
    this.projectId = this.projectService.project.id;
    this.project = this.projectService.project;
  }

  ngOnChanges() {
    this.projectId = this.projectService.project.id;
    this.project = this.projectService.project;
  }

	onSubmit(): void {
    if (this.checkoutForm.valid) {
      let newCard : Partial<Card> = {
        title: this.checkoutForm.value.newTitle,
        description: '',
        position: this.cardList.length + 1,
        wrapperId: this.wrapper.id,
        status: TaskStatus.TODO,
      }
      this.cardService.addCard(newCard).subscribe((data : Card) => {
         let returnCard = data;
         this.cardList.push(returnCard);
         this.wrapper.cardsIds = this.cardList.map(card => card.id) as number[];
         this.isAddingTask = false;
      });
      this.checkoutForm.reset();
    }
	}
}
