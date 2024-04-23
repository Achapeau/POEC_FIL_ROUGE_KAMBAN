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
import { UserService } from '../../../Service/user.service';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent, CdkDropList, CdkDrag, ModalComponent],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent implements OnInit {
  @Input() project! : Project;
  @Input() wrappersId : number[] = [];
  @Input() wrappersList : Wrapper[] = [];
  newTitle! : string;
  active: boolean = false;
  routeParam: any;
  
	
constructor(public userService : UserService, public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {

}
ngOnInit() : void {
  this.projectService.getProject().subscribe(project => console.log(project));
  this.route.paramMap.subscribe(params => {
    let projectId = Number(params.get('id'));
    this.projectService.getProjectById(projectId).subscribe(project => {
      this.project = project;
      this.projectService.project = project;
      this.wrapperService.convertIdListToWrapperList(this.project.wrappersIds);
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
    const confirmation = confirm('Etes vous étes sur de vouloir supprimer ce projet ?');
    if (confirmation) {
      console.log(this.projectService.project.id);
      
      this.active = false;
      
      this.projectService.deleteProject(this.projectService.project.id).subscribe();
      this.projectService.deleteProject(this.projectService.project.id).subscribe();
      console.log('project deleted');
      console.log(this.project.id);
      console.log(this.projectService.getProjectsForCurrentUser());
      this.projectService.projects = this.projectService.projects.filter(project => project.id !== this.project.id);
      // console.log(this.sidebarComponent.projects);
      // this.projectService.projects = this.sidebarComponent.projects;
      // this.projectListComponent.projects = this.projectService.projects;
      // let ids = this.sidebarComponent.projects.map(project => project.id);
      this.projectService.redirectToProjectList();

    }
  }
}
