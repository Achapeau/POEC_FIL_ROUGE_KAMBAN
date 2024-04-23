import { Component, Input, OnInit } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper, Project, User } from '../../../Model/model';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../Service/project.service';
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { forkJoin } from 'rxjs';
import { ModalComponent } from '../../../modal/modal.component';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent, CdkDropList, CdkDrag, ModalComponent],
  templateUrl: './wrapper-list.component.html',
  styleUrls: ['./wrapper-list.component.css']
})
export class WrapperListComponent implements OnInit {
  @Input() project: Project = this.projectService.project;
  @Input() projectId!: number;
  @Input() wrappersId: number[] = [];
  @Input() wrappersList: Wrapper[] = this.wrapperService.wrappers;
  newTitle!: string;
  active: boolean = false;
  routeParam: any;
  membersIcons: { [key: number]: string } = {}; // Store user icons by user ID

  constructor(public wrapperService: WrapperService, public projectService: ProjectService, private route: ActivatedRoute, public userService: UserService) {}

  ngOnInit(): void {
    this.routeParam = this.route.snapshot.params['id'];
    this.loadProjectDetails();
  }

  loadProjectDetails() {
    this.projectService.getProjectById(this.routeParam).subscribe(project => {
      this.project = project;
      this.getWrappers();
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
        this.membersIcons[user.id] = `/assets/svg/${user.icon}`; // Store icons with the path
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

  deleteProject(): void {
    this.projectService.deleteProject(this.routeParam).subscribe(() => {
      this.active = false;
      // Redirect or handle UI update here
    });
  }
}
