import { Component, Input } from '@angular/core';
import { WrapperService } from '../../Service/wrapper.service';
import { UserService } from '../../Service/user.service';
import { Wrapper } from '../../Model/Wrapper';
import { Card } from '../../Model/Card';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../Model/Project';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CardService } from '../../Service/card.service';
import { CardNewComponent } from '../card-new/card-new.component';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, CardComponent, WrapperComponent, CardNewComponent, CdkDropList, CdkDrag],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent {
  @Input() wrapper!: Wrapper;
  @Input() card!: Card;
  @Input() newTitle!: String;
  project!: Project;
  cardList: Card[] = [];
  i: number = 0;

  constructor(public wrapperService: WrapperService, public cardService: CardService, public users: UserService) { }

  ngOnInit() {
    if (this.wrapper) {
      this.cardList = this.wrapper.cards;
    }
  }
  ngOnChanges() {
    this.i = this.i + 1;
    console.log("change", this.i);
    this.wrapper.position = this.i;
    // this.wrapperService.updateWrapper(this.wrapper).subscribe();
  }
  addTask(newTitle: String, wrapper: Wrapper) {
    // Wrapper.cards.push(this.card);
    // this.wrapperService.updateWrapper(Wrapper).subscribe();
  }
  drop(event: CdkDragDrop<Card[]>) {
    // console.log(event.container.data[event.previousIndex].title);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      event.container.data[event.currentIndex].position = event.currentIndex + 1;
      // this.card.position = event.currentIndex + 1;
      // this.card = event.container.data[event.currentIndex];
      // this.cardService.updateCard(this.card);
      // this.wrapperService.updateWrapper(this.wrapper);
    }
  }
}