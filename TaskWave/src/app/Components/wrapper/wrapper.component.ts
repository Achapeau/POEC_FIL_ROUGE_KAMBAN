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
import { ProjectService } from '../../Service/project.service';
import { Observable } from 'rxjs';
import { CardDTO } from '../../Model/CardDTO';
import { ProjectDTO } from '../../Model/ProjectDTO';

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
  project!: Project | ProjectDTO;
  cardList: Card[] = [];

  constructor(private projectService: ProjectService, public wrapperService: WrapperService, public cardService: CardService, public users: UserService) {
    console.log("project id = " + this.projectService.project.id);
    this.project = this.projectService.getProjectById(this.projectService.project.id);
   }

  ngOnInit() {
    if (this.wrapper) {
      this.cardList = this.wrapper.cards;
    }
  }
  ngOnChanges() {
    // this.wrapper.cards = this.cardList;
    // this.wrapperService.updateWrapper(this.wrapper).subscribe();
  }
  drop(event: CdkDragDrop<Card[]>) {
    // console.log(event);
    // console.log(event.currentIndex);
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
    this.cardList.forEach((card, index) => {
      if (card.position != index || card.wrapperId != this.wrapper.id) {
        card.position = index;
        card.wrapperId = this.wrapper.id;
        this.cardService.updateCard(card).subscribe();
      }
      if(!this.cardList.includes(card)) {
        this.cardList.push(card);
      }
    })
    this.wrapper.cards = this.cardList;
    this.wrapperService.updateWrapper(this.wrapper).subscribe();
  }
}