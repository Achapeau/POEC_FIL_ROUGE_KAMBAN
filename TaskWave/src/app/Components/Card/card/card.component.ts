import { Component, Input } from '@angular/core';
import { Card } from '../../../Model/Card';
import { TaskModalComponent } from '../../../task-modal/task-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TaskModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!: Card;

  showModal: boolean = false;
  selectedCard: Card | null = null;

  openModal(): void {
    this.selectedCard = this.card;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
