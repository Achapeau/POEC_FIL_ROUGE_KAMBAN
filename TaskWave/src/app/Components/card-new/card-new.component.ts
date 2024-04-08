import { Component, Input } from '@angular/core';
import { CardService } from '../../Service/card.service';
import { Card } from '../../Model/Card';
import { Wrapper } from '../../Model/Wrapper';

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [],
  templateUrl: './card-new.component.html',
  styleUrl: './card-new.component.css'
})
export class CardNewComponent {
  constructor(cardService : CardService) { }
	@Input() card! : Card;
  @Input() newTitle!: String;

  addTask(newTitle: String, wrapper: Wrapper) {
    // Wrapper.cards.push(this.card);
    // this.wrapperService.updateWrapper(Wrapper).subscribe();
  }


}
