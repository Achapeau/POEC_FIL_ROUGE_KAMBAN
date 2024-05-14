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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, WrapperComponent, WrapperListComponent, CardNewComponent, CdkDropList, CdkDrag],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent implements OnInit {
  @Input() wrapper!: Wrapper;
  @Input() card!: Card;
  @Input() is_editing_title: boolean = false;
  @Input() title!: string;
  @Input() project: Project = this.projectService.project;
  @Input() cardList: Card[] = [];
  
  constructor(private wrapperListComponent: WrapperListComponent, private projectService: ProjectService, public wrapperService: WrapperService, public cardService: CardService, public users: UserService) {
    
   }

  ngOnInit() {
    // this.projectService.getProjectById(this.projectService.project.id).subscribe(project => this.project = project);
    this.cardList = this.cardService.convertIdListToCardList(this.wrapper.cardsIds);
    this.title = this.wrapper.title;
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
  //   console.log(this.cardList);
  // if (this.cardList.length > 0) {
  //   alert('Veuillez d\'abord supprimer ou déplacer tous les cartes de cette liste !');
  //   return;
  // }else {
    const confirmation = confirm('Etes vous étes sur de vouloir supprimer cette liste ?');
    if (confirmation) {
      this.wrapperService.deleteWrapper(this.wrapper.id).subscribe();
      this.wrapperService.wrappers = this.wrapperService.wrappers.filter(wrapper => wrapper.id != this.wrapper.id);
      this.wrapperListComponent.wrappersList = this.wrapperService.wrappers;
      this.projectService.project.wrappersIds = this.wrapperService.wrappers.map(wrapper => wrapper.id).filter(id => id != this.wrapper.id) as number[];

    }
  // }
   
  }

  is_editing_mode_title() {
    // if (!this.is_editing_description) {
      if (this.is_editing_title) {
        this.wrapper.title = this.title;
        this.wrapperService.updateWrapper(this.wrapper).subscribe();
      }
      this.is_editing_title = !this.is_editing_title;
    // }
  }
}