import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Card, User } from '../../../Model/model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { CommonModule } from '@angular/common';
import { CardService } from '../../../Service/card.service';
import { UserService } from '../../../Service/user.service';

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
  userIcons: string[] = []; // Ce devrait être un tableau pour gérer potentiellement plusieurs icônes

  constructor(
    private cardService: CardService, 
    private userService: UserService // Injecter UserService pour accéder aux infos utilisateur
  ) { }

  ngOnInit(): void {
    this.fetchUserIcon();
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
        error => {
          console.error('Error fetching user icon:', error);
        }
      );
    }
  }

  openModal(): void {
    this.selectedCard = this.card;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    if (this.selectedCard) {
      this.cardService.getCardById(this.selectedCard.id).subscribe(
        card => {
          this.card = card;
          console.log("Modal closed");
        }
      );
    }
  }
}
