import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardService } from '../../Service/card.service';
import { Card } from '../../Model/Card';
import { Wrapper } from '../../Model/Wrapper';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardDTO } from '../../Model/CardDTO';
import { WrapperService } from '../../Service/wrapper.service';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-card-new',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './card-new.component.html',
  styleUrl: './card-new.component.css'
})
export class CardNewComponent {
  newTitle!: string | null;
  @Input() wrapper! : Wrapper;
  projectId : number = this.wrapperService.projectId;
  @Input() cardList : Card[] = [];
  @Output() cardListChange = new EventEmitter<Card[]>();

	constructor(public wrapperService : WrapperService, private cardService : CardService, public fb : FormBuilder) {
    // console.log("project id = " + this.projectId);
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

	onSubmit() {
    if (this.checkoutForm.valid) {
      let newCard : CardDTO = {
        title: this.checkoutForm.value.newTitle,
        description: '',
        position: this.cardList.length + 1,
        wrapperId: this.wrapper.id,
        status: this.wrapper.title
      }
      // console.log(newCard);
      let returnCard = this.cardService.addCard(newCard);
      if (returnCard) {
        this.cardList.push(returnCard);
        this.cardListChange.emit(this.cardList);
      }
      this.checkoutForm.reset();
    }
	}


}
