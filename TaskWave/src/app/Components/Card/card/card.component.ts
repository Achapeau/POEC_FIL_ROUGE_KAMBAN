import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Card } from '../../../Model/Card';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { CommonModule } from '@angular/common';
import { CardService } from '../../../Service/card.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TaskModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card!: Card;

  @Input() cardList!: Card[];

  showModal: boolean = false;
  selectedCard: Card | null = null;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    // console.log(this.card);
   }

  ngOnChanges(): void {
    this.cardService.getCardById(this.card.id).subscribe(card => this.card = card);
  }

  openModal(): void {
    this.selectedCard = this.card;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.cardService.getCardById(this.card.id).subscribe(card => this.card = card);
    console.log("close modal");
  }
}
