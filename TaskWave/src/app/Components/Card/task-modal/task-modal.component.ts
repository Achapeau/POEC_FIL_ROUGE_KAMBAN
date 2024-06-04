import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card, User } from '../../../Model/model';
import { ProjectService } from '../../../Service/project.service';
import { UserService } from '../../../Service/user.service';
import { CardService } from '../../../Service/card.service';
import { PriorityDelay } from '../../../Model/enum';
import { WrapperComponent } from '../../Wrapper/wrapper/wrapper.component';
import { ClickInsideDirective } from '../../../click-inside.directive';
import { ClickOutsideDirective } from '../../../click-outside.directive';
import { CalculateService } from '../../../Service/calculate.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickInsideDirective,
    ClickOutsideDirective,
    MatProgressBarModule,
  ],
  standalone: true,
})
export class TaskModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() card!: Card;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() membersList: Partial<User>[] = [];
  taskStatusOptions: string[] = Object.values(PriorityDelay);
  isOpen: boolean = false;
  newDueDate: string = '';
  progressBarValue: number = 0;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private cardService: CardService,
    private fb: FormBuilder,
    private wrapperComponent: WrapperComponent,
    private calculateService: CalculateService
  ) {}

  public taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [Date()],
    assignedTo: [''],
    status: [''],
  });
  ngOnInit(): void {
    this.projectService.project.userIds.map((id) =>
      this.userService
        .getUserById(id)
        .subscribe((user) => this.membersList.push(user))
    );
    this.isOpen = true;
    if (this.card.dueDate) {
      this.progressBarValue =
        100 -
        this.calculateService.calculateRatioDate(
          this.card.dueDate,
          this.card?.createdDate
        );
    }
  }

  ngOnChanges(): void {
    if (this.card) {
      this.newDueDate = this.card.dueDate?.toString() || '-';
      this.taskForm.reset({
        title: this.card.title || '',
        description: this.card.description || '',
        dueDate: this.newDueDate.split('.')[0] || null,
        assignedTo: this.card.assignedTo?.toString() || '',
        status: this.card?.status || '',
      });
    }
  }

  closeDate(): void {
    if (this.taskForm.value.dueDate) {
      this.progressBarValue =
        100 -
        this.calculateService.calculateRatioDate(
          this.taskForm.value.dueDate,
          this.card?.createdDate
        );
    }
  }

  closeModal(): void {
    if (!this.isOpen) {
      this.isVisible = false;
      this.closeModalEvent.emit();
    }
    this.isOpen = false;
  }

  submitTask(): void {
    if (this.taskForm.valid) {
      let updatedCard: Partial<Card> = {
        id: this.card?.id,
        title: this.taskForm.value.title as string,
        position: this.card?.position,
        wrapperId: this.card?.wrapperId,
        description: this.taskForm.value.description as string,
        createdDate: this.card?.createdDate,
        dueDate: this.taskForm.value.dueDate,
        assignedTo: this.taskForm.value.assignedTo
          ? parseInt(this.taskForm.value.assignedTo, 10)
          : null,
        status: this.checkRatio(),
      };
      this.cardService.updateCard(updatedCard).subscribe(
        (response) => {
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

  deleteTask() {
    const result = confirm('Vous vous appretiez à supprimer cette tâche ?');
    if (result) {
      this.cardService.deleteCard(this.card?.id as number).subscribe();
      this.wrapperComponent.cardList = this.wrapperComponent.cardList.filter(
        (card) => card.id !== this.card.id
      );
      this.closeModal();
    }
  }

  checkRatio(): string {
    if (this.taskForm.value.dueDate) {
      const ratio = this.calculateService.calculateRatioDate(
        this.taskForm.value.dueDate,
        this.card?.createdDate
      );
      return ratio > 66 ? 'Basse' : ratio > 33 ? 'Moyenne' : 'Elevée';
    }
    return 'Basse';
  }
}
