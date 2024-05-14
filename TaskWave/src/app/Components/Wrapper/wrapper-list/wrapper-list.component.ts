import { Component, Input, OnInit } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper, Project } from '../../../Model/model';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../Service/project.service';
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { forkJoin } from 'rxjs';
import { ModalComponent } from '../../../modal/modal.component';
import { UserService } from '../../../Service/user.service';
import { FormsModule } from '@angular/forms';
import { ModalUpdateProjectComponent } from '../../../modal/modal-update-project/modal-update-project.component';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [FormsModule, CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent, CdkDropList, CdkDrag, ModalComponent, ModalUpdateProjectComponent],
  templateUrl: './wrapper-list.component.html',
  styleUrls: ['./wrapper-list.component.css']
})
export class WrapperListComponent implements OnInit {
  @Input() project: Project = this.projectService.project;
  @Input() projectId!: number;
  @Input() wrappersId : number[] = [];
  @Input() wrappersList : Wrapper[] = this.wrapperService.wrappers;
  active: boolean = false;
  routeParam: any;
  membersIcons: { [key: number]: string } = {};
  @Input() title: string = this.projectService.project.title;
  @Input() description: string = this.projectService.project.description;
  @Input() isOpenChange!: boolean;
  isModalOpen: boolean = this.isOpenChange;
  
	
constructor(public userService : UserService, public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {

}
ngOnInit() : void {
    this.routeParam = this.route.snapshot.params['id'];
    this.loadProjectDetails();
    this.projectService.getProject().subscribe(project => console.log(project));
    this.route.paramMap.subscribe(params => {
      let projectId = Number(params.get('id'));
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.project = project;
        this.projectService.project = project;
        this.title = project.title;
        this.description = project.description;
        this.getWrappers();
      });
    });
  }

  loadProjectDetails() {
    this.projectService.getProjectById(this.routeParam).subscribe(project => {
      this.project = project;
      // this.getWrappers();
      this.loadMemberIcons(project);
    });
  }

  
  getWrappers(): void {
    const observables = this.project.wrappersIds.map(id => this.wrapperService.getWrapperById(id));
    forkJoin(observables).subscribe((data: Wrapper[]) => {
      this.wrappersList = data;
      this.wrappersList = this.wrappersList.sort((a, b) => a.position - b.position);
      this.wrapperService.wrappers = this.wrappersList;
    });
  }

  loadMemberIcons(project: Project): void {
    project.userIds.forEach(userId => {
      this.userService.getUserById(userId).subscribe(user => {
        this.membersIcons[user.id] = `/assets/svg/${user.icon}`; 
      });
    });
  }

  drop(event: CdkDragDrop<Wrapper[]>): void {
    moveItemInArray(this.wrappersList, event.previousIndex, event.currentIndex);
    this.wrappersList.forEach((wrapper, index) => {
      wrapper.position = index;
      this.wrapperService.updateWrapper(wrapper).subscribe();
    });
  }

  deleteProject() {
    const confirmation = confirm('Etes vous étes sur de vouloir supprimer ce projet ?');
    if (confirmation) {
      this.active = false;
      this.projectService.deleteProject(this.projectService.project.id).subscribe();
      this.projectService.projects = this.projectService.projects.filter(project => project.id !== this.project.id);
      this.projectService.redirectToProjectList();
    }
  }

  openUpdateProjectModal() {
    this.isModalOpen = true;
  }
}
