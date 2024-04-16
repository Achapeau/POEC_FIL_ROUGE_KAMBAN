import { Component, Input } from '@angular/core';
import { Card } from '../../../Model/Card';
import { CardService } from '../../../Service/card.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(cardService : CardService) { }
	@Input() card! : Card;

}
