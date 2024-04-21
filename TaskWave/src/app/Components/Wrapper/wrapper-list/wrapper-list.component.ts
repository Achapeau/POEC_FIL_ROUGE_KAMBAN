import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper, Project } from '../../../Model/model';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../Service/project.service';
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent, CdkDropList, CdkDrag],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent implements OnInit {
  @Input() project : Project = this.projectService.project;
  @Input() projectId! : number;
  @Input() wrappersId : number[] = [];
  @Input() wrappersList : Wrapper[] = this.wrapperService.wrappers;
  newTitle! : string;
	
constructor(public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {
  
}
ngOnInit() : void {
  // this.projectId = this.route.snapshot.params['id'];
  // this.projectService.getProjectById(this.projectId).subscribe(project => this.project = project);
  
  this.route.paramMap.subscribe(params => {
    const projectId = Number(params.get('id'));
    this.projectService.getProjectById(projectId).subscribe(project => this.project = project);
    console.log(this.project);
    this.getWrappers();
  });
}
  
  getWrappers(): void {
    const observables = this.projectService.project.wrappersIds.map(id => this.wrapperService.getWrapperById(id));
    
    forkJoin(observables).subscribe((data: Wrapper[]) => {
      this.wrappersList = data;
      this.wrappersList = this.wrappersList.sort((a, b) => a.position - b.position);
      this.wrapperService.wrappers = this.wrappersList;
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
