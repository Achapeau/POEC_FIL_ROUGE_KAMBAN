import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper } from '../../../Model/Wrapper';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../Model/Project';
import { ProjectService } from '../../../Service/project.service';
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { Observable, forkJoin } from 'rxjs';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent, CdkDropList, CdkDrag],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent implements OnInit, OnChanges {
  project! : Project;
  @Input() projectId! : number;
  @Input() wrappersId! : number[];
  @Input() wrappersList : Wrapper[] = [];
  newTitle! : string;
	
constructor(public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {
  
}
ngOnInit() : void {
  this.projectId = this.route.snapshot.params['id'];
  this.projectService.getProjectById(this.projectId).subscribe(project => this.project = project);
  this.getWrappers();
}
ngOnChanges(): void {
  // this.projectId = this.route.snapshot.params['id'];
  // this.project = this.projectService.getProjectById(this.projectId);
  // this.getWrappers();
}
  
  getWrappers(): void {
    const observables = this.projectService.project.wrappersIds.map(id => this.wrapperService.getWrapperById(id));
    
    forkJoin(observables).subscribe((data: Wrapper[]) => {
      this.wrappersList = data;
      this.wrappersList = this.wrappersList.sort((a, b) => a.position - b.position);
      this.projectService.wrappers = this.wrappersList;
    });
  }
  drop(event: CdkDragDrop<Wrapper[]>) {
    moveItemInArray(this.wrappersList, event.previousIndex, event.currentIndex);
    this.wrappersList.forEach((wrapper, index) => {
      wrapper.position = index;
      this.wrapperService.updateWrapper(wrapper).subscribe();
    })
  }
}
