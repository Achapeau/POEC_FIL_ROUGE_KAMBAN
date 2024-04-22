import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { UserService } from '../../../Service/user.service';
import { Wrapper, Card, Project } from '../../../Model/model';
import { CardComponent } from '../../Card/card/card.component';
import { CommonModule } from '@angular/common';
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
import { WrapperListComponent } from '../wrapper-list/wrapper-list.component';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, CardComponent, WrapperComponent, WrapperListComponent, CardNewComponent, CdkDropList, CdkDrag],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent implements OnInit {
  @Input() wrapper!: Wrapper;
  @Input() card!: Card;
  @Input() newTitle!: String;
  @Input() project!: Project;
  @Input() cardList: Card[] = [];
  
  constructor(private wrapperListComponent: WrapperListComponent, private projectService: ProjectService, public wrapperService: WrapperService, public cardService: CardService, public users: UserService) {
    
   }

  ngOnInit() {
    this.projectService.getProjectById(this.projectService.project.id).subscribe(project => this.project = project);
    this.cardList = this.cardService.convertIdListToCardList(this.wrapper.cardsIds);
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
      event.previousContainer.data.forEach((card, index) => {
        card.position = index;
        this.cardService.updateCard(card).subscribe();
      })
      this.wrapperService.getWrapperById(Number(event.previousContainer.id)).subscribe((data : Wrapper) => {
        let prevWrapper = data;
        prevWrapper.cardsIds = event.previousContainer.data.map(card => card.id) as number[];
        this.wrapperService.updateWrapper(prevWrapper).subscribe();
      });
    }
    event.container.data.forEach((card, index) => {
      card.position = index;
      this.cardService.updateCard(card).subscribe();
    })
    this.wrapperService.getWrapperById(Number(event.container.id)).subscribe((data : Wrapper) => {
      let nextWrapper = data;
      nextWrapper.cardsIds = event.container.data.map(card => card.id) as number[];
      this.wrapperService.updateWrapper(nextWrapper).subscribe();
    });
  }
  deleteWrapper() {
   const confirmation = confirm('Etes vous étes sur de vouloir supprimer cette liste ?');
   if (confirmation) {
     this.wrapperService.deleteWrapper(this.wrapper.id).subscribe();
     this.wrapperService.wrappers = this.wrapperService.wrappers.filter(wrapper => wrapper.id != this.wrapper.id);
     this.wrapperListComponent.wrappersList = this.wrapperService.wrappers;
   }
   
  }
}