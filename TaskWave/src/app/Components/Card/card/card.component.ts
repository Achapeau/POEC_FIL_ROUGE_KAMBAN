import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Card, User } from '../../../Model/model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { CommonModule } from '@angular/common';
import { CardService } from '../../../Service/card.service';
import { UserService } from '../../../Service/user.service';
import { ClickInsideDirective } from '../../../click-inside.directive';
import { CalculateService } from '../../../Service/calculate.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, ClickInsideDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() card!: Card;
  @Input() cardList!: Card[];
  @Output() isOpenModal: EventEmitter<boolean> = new EventEmitter();

  showModal: boolean = false;
  selectedCard: Card | null = null;
  userIcons: string[] = []; // Ce devrait être un tableau pour gérer potentiellement plusieurs icônes
  isDragging: boolean = false;
  isInside: boolean = false;
  prority: string = 'Low';

  constructor(
    private cardService: CardService,
    private userService: UserService, // Injecter UserService pour accéder aux infos utilisateur
    private calculateService: CalculateService
  ) {}

  ngOnInit(): void {
    this.fetchUserIcon();
    this.prority = this.checkUrgency();
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging && this.isInside) {
      this.isDragging = true;
    }
  }

  onClick(event: MouseEvent): void {
    if (!this.isDragging) {
      this.openModal();
    }
  }

  ngOnChanges(): void {
    // Assurez-vous de vérifier que l'utilisateur assigné existe avant de récupérer l'icône

    if (this.card && this.card.assignedTo) {
      this.fetchUserIcon();
    }
  }

  fetchUserIcon(): void {
    // Vérifiez si un utilisateur est assigné avant d'essayer de récupérer son icône
    if (this.card.assignedTo) {
      this.userService.getUserById(this.card.assignedTo).subscribe(
        (user: User) => {
          // Supposons que 'icon' est le chemin d'accès à l'icône dans l'objet utilisateur
          if (user.icon) {
            this.userIcons = [`/assets/svg/${user.icon}`]; // Utilisez un chemin absolu
          } else {
            // Fournir une icône par défaut si aucune icône n'est présente
            this.userIcons = ['/assets/svg/default-icon.svg'];
          }
        },
        (error) => {
          console.error('Error fetching user icon:', error);
        }
      );
    }
  }

  openModal(): void {
    this.selectedCard = this.card;
    this.showModal = true;
    this.isOpenModal.emit(this.showModal);
    let now: Date | null = null;
    if (this.card.dueDate) {
      now = new Date(this.card.dueDate);
    }
    console.log(now);
    console.log(this.card.createdDate);

    if (this.card.createdDate && this.card.dueDate) {
      console.log(
        this.calculateService.calculateRatioDate(
          this.card.dueDate,
          this.card.createdDate
        )
      );
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.isOpenModal.emit(this.showModal);
    if (this.selectedCard) {
      this.cardService.getCardById(this.selectedCard.id).subscribe((card) => {
        this.card = card;
      });
    }
  }

  checkUrgency(): string {
    if (!this.card.dueDate || !this.card.createdDate) {
      return 'Low';
    }
    const ratio = this.calculateService.calculateRatioDate(
      this.card.dueDate,
      this.card.createdDate
    );
    if (ratio > 66) {
      return 'Low';
    } else if (ratio > 33) {
      return 'Medium';
    } else {
      return 'High';
    }
  }
}
