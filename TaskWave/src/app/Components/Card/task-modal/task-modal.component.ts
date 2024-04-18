import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card } from '../../../Model/Card';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class TaskModalComponent {
  @Input() isVisible: boolean = false;
  @Input() cardData: Card | null = null; 
  @Output() closeModalEvent = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      member: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.cardData) {
      this.taskForm.reset({
        description: this.cardData.description || '',
        deadline: this.cardData.deadline || '',
        member: this.cardData.memberId || '',
        status: this.cardData.status || ''
      });
    }
  }

  closeModal(): void {
    this.isVisible = false;
    this.closeModalEvent.emit();
  }

  submitTask(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.closeModal();
    }
  }
}
