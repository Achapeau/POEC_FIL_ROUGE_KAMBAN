import { Component, Input, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card } from '../../../Model/Card';
import { ProjectService } from '../../../Service/project.service';
import { TaskStatus } from '../../../Model/TaskStatus';
import { UserService } from '../../../Service/user.service';
import { User } from '../../../Model/User';
import { CardService } from '../../../Service/card.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class TaskModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() card!: Card;
  @Input() cardData!: Card | null; 
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() membersList: Partial<User>[] = [];
  taskStatusOptions: string[] = Object.values(TaskStatus);
  
  constructor(private projectService: ProjectService, private userService: UserService, private cardService: CardService, private fb: FormBuilder) {
  }

  public taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [Date()],
    assignedTo: [''],
    status: ['']
  });
  ngOnInit(): void {
    this.projectService.project.userIds.map(id => this.userService.getUserById(id).subscribe(user => this.membersList.push(user)));
  }

  ngOnChanges(): void {
    // this.cardData = this.card;
    if (this.cardData) {
      this.taskForm.reset({
        title: this.cardData.title || '',
        description: this.cardData.description || '',
        dueDate: this.cardData.dueDate?.split('.')[0] || null,
        assignedTo: this.cardData.assignedTo?.toString() || '',
        status: this.cardData?.status || '',
      });
    }
  }

  closeModal(): void {
    this.isVisible = false;
    this.closeModalEvent.emit();
  }

  submitTask(): void {
    if (this.taskForm.valid) {
      let updatedCard : Partial<Card> = {
        id: this.cardData?.id,
        title: this.taskForm.value.title,
        position: this.cardData?.position,
        wrapperId: this.cardData?.wrapperId,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate ? this.taskForm.value.dueDate : null,
        assignedTo: this.taskForm.value.assignedTo ? parseInt(this.taskForm.value.assignedTo, 10) : null,
        status: this.taskForm.value.status  || null,
      }
      this.cardService.updateCard(updatedCard).subscribe(
        (response) => {
          this.cardData = response;
          this.card = response;
          this.cardService.card = response;
          this.closeModal();
        },
        (error) => {
          console.error('Error updating card:', error);
        }
      );
      this.taskForm.reset();
    }
  }
}
