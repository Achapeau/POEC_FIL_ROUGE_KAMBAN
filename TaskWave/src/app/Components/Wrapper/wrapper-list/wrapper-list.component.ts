import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper, Project } from '../../../Model/model';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute} from '@angular/router';
import { ProjectService } from '../../../Service/project.service';
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { forkJoin } from 'rxjs';
import { ModalComponent } from '../../../modal/modal.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent, CdkDropList, CdkDrag, ModalComponent ],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent implements OnInit {
  @Input() project : Project = this.projectService.project;
  @Input() projectId! : number;
  @Input() wrappersId : number[] = [];
  @Input() wrappersList : Wrapper[] = this.wrapperService.wrappers;
  newTitle! : string;
  active: boolean = false;
  routeParam: any;
	
constructor(public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {
  
}
ngOnInit() : void {
  this.projectId = this.route.snapshot.params['id'];
  // this.projectService.getProjectById(this.projectId).subscribe(project => this.project = project);
  
  this.route.paramMap.subscribe(params => {
    console.log(params.get('id'));
    const projectId = Number(params.get('id'));
    this.projectService.getProjectById(projectId).subscribe(project => {
      this.project = project;
      this.wrappersList = this.wrapperService.wrappers;
      this.getWrappers();
    });
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

  deleteProject() {
    console.log(this.projectId);
    
    this.active = false;
    // this.sidebarComponent.projects = this.sidebarComponent.projects.filter(project => project.id !== this.projectId);
    this.projectService.deleteProject(this.projectId).subscribe();
  }

}
