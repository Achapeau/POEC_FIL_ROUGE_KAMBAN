import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { UserService } from '../../../Service/user.service';
import { Wrapper } from '../../../Model/Wrapper';
import { Card } from '../../../Model/Card';
import { CardComponent } from '../../Card/card/card.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../../Model/Project';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CardService } from '../../../Service/card.service';
import { CardNewComponent } from '../../Card/card-new/card-new.component';
import { ProjectService } from '../../../Service/project.service';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, CardComponent, WrapperComponent, CardNewComponent, CdkDropList, CdkDrag],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent implements OnInit, OnChanges {
  @Input() wrapper!: Wrapper;
  @Input() card!: Card;
  @Input() newTitle!: String;
  @Input() project!: Project;
  @Input() cardList: Card[] = [];

  constructor(private projectService: ProjectService, public wrapperService: WrapperService, public cardService: CardService, public users: UserService) {
    this.project = this.projectService.getProjectById(this.projectService.project.id)!;
   }

  ngOnInit() {
    this.cardList = this.cardService.convertIdListToCardList(this.wrapper.cardsIds);
    // console.log("before sort");
    // console.log(this.cardList);
    this.cardList = this.cardList.sort(function(a, b) { return a.position - b.position }) as Card[];
    // console.log("after sort");
    // console.log(this.cardList);
    this.wrapper.cardsIds = this.cardList.map(card => card.id) as number[];
  }
  ngOnChanges() {
    // this.cardList = this.cardService.convertIdListToCardList(this.wrapper.cardsIds);
  }
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.wrapperService.getWrapperById(event.previousContainer.data[0].wrapperId as number).subscribe((data : Wrapper) => {
        let prevWrapper = data;
        prevWrapper.cardsIds = event.previousContainer.data.map(card => card.id) as number[];
        this.wrapperService.updateWrapper(prevWrapper).subscribe((data : Wrapper) => {
        })
      });
      console.log("event.item.data");
      console.log(event.item.data);
      console.log("event.item");
      console.log(event.item);
      console.log("event");
      console.log(event);
    }
    // this.cardList.forEach((card, index) => {
    //   if (card.position != index || card.wrapperId != this.wrapper.id) {
    //     card.position = index;
    //     card.wrapperId = this.wrapper.id;
    //     this.cardService.updateCard(card).subscribe((data : Card) => {
    //       card = data;
    //     })
    //   }
      // if(!this.cardList.includes(card)) {
      //   this.cardList.push(card);
      // }
    // })
    this.wrapper.cardsIds = this.cardList.map(card => card.id) as number[];
    this.wrapperService.updateWrapper(this.wrapper).subscribe((data : Wrapper) => {
      // console.log("data");
      // console.log(data);
    })
  }
}