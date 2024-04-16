import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardService } from '../../../Service/card.service';
import { Card } from '../../../Model/Card';
import { Wrapper } from '../../../Model/Wrapper';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardDTO } from '../../../Model/CardDTO';
import { WrapperService } from '../../../Service/wrapper.service';
import { WrapperComponent } from '../../Wrapper/wrapper/wrapper.component';
import { Router } from '@angular/router';
import { ProjectService } from '../../../Service/project.service';

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

	constructor(private projectService : ProjectService, public wrapperService : WrapperService, private cardService : CardService, public fb : FormBuilder, private router : Router) {
    // console.log("project id = " + this.projectId);
   }

	public checkoutForm = this.fb.group({
		newTitle: ['', [Validators.required]],
	});

	onSubmit() {
    if (this.checkoutForm.valid) {
      let newCard : Partial<Card> = {
        title: this.checkoutForm.value.newTitle,
        description: '',
        position: this.cardList.length + 1,
        wrapperId: this.wrapper.id,
        status: this.wrapper.title
      }
      // console.log(newCard);
      this.cardService.addCard(newCard).subscribe((data : Card) => {
         let returnCard = data;
         this.cardList.push(returnCard);
         this.cardListChange.emit(this.cardList);
      });
      this.checkoutForm.reset();
      this.projectService.selectProject(this.projectService.getProjectById(this.projectId));
      // this.router.navigate(['tab', this.projectId], { skipLocationChange: true }).then(() => {
      //   window.location.reload();
      // });
    }
	}


}
