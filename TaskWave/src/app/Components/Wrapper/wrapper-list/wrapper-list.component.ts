import { Component, Input, OnInit } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper, Project, User } from '../../../Model/model';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../Service/project.service';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { forkJoin } from 'rxjs';
import { ModalComponent } from '../../../modal/modal.component';
import { UserService } from '../../../Service/user.service';
import { FormsModule } from '@angular/forms';
import { ModalUpdateProjectComponent } from '../../../modal/modal-update-project/modal-update-project.component';
import { AuthService } from '../../../Service/auth.service';
import { ModalUpdateProjectMemberComponent } from '../../../modal/modal-update-project-member/modal-update-project-member.component';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    WrapperComponent,
    CdkDropListGroup,
    WrapperCreateComponent,
    CdkDropList,
    CdkDrag,
    ModalComponent,
    ModalUpdateProjectComponent,
    ModalUpdateProjectMemberComponent,
  ],
  templateUrl: './wrapper-list.component.html',
  styleUrls: ['./wrapper-list.component.css'],
})
export class WrapperListComponent implements OnInit {
  @Input() project: Project = this.projectService.project;
  @Input() projectId!: number;
  @Input() wrappersId: number[] = [];
  @Input() wrappersList: Wrapper[] = this.wrapperService.wrappers;
  active: boolean = false;
  routeParam: any;
  members: Partial<User>[] = [];
  @Input() title!: string;
  @Input() description!: string;
  background!: string;
  @Input() isOpenChange!: boolean;
  isModalOpen: boolean = this.isOpenChange;
  isModalUpdateMemberOpen: boolean = false;
  myUser!: User;

  constructor(
    public userService: UserService,
    public wrapperService: WrapperService,
    public projectService: ProjectService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.getToken() !== null) {
      let token = this.authService.decodeToken();
      this.userService
        .getUserByEmail(token?.sub as string)
        .subscribe((user) => {
          this.myUser = user;
          this.userService.setCurrentUser(this.myUser);
        });
      this.userService.connected = true;
    } else {
      this.router.navigate(['connexion']);
    }
    if (!this.projectService.project) {
      this.projectService
        .getProjectById(Number(localStorage.getItem('project')))
        .subscribe((project) => {
          this.loadProjectDetails(project);
        });
    } else {
      this.loadProjectDetails(this.projectService.project);
    }
  }

  loadProjectDetails(project: Project): void {
    this.project = project;
    this.projectService.project = project;
    this.title = project.title;
    this.description = project.description;
    this.background = project.background;
    this.loadMemberIcons(project);
    this.getWrappers();
  }

  getWrappers(): void {
    const observables = this.project.wrappersIds.map((id) =>
      this.wrapperService.getWrapperById(id)
    );
    forkJoin(observables).subscribe((data: Wrapper[]) => {
      this.wrappersList = data;
      this.wrappersList = this.wrappersList.sort(
        (a, b) => a.position - b.position
      );
      this.wrapperService.wrappers = this.wrappersList;
    });
  }

  loadMemberIcons(project: Project): void {
    project.userIds.forEach((userId) => {
      this.members = [];
      this.userService.getUserById(userId).subscribe((user) => {
        let memberInfo = {
          icon: `/assets/svg/${user.icon}`,
          firstname: user.firstname,
          lastname: user.lastname,
        };
        this.members.push(memberInfo);
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
    const confirmation = confirm(
      'Etes vous étes sur de vouloir supprimer ce projet ?'
    );
    if (confirmation) {
      this.active = false;
      this.projectService
        .deleteProject(this.projectService.project.id)
        .subscribe();
      this.projectService.projects = this.projectService.projects.filter(
        (project) => project.id !== this.project.id
      );
      this.projectService.redirectToProjectList();
    }
  }

  openUpdateProjectModal() {
    this.isModalOpen = true;
  }

  openUpdateProjectMemberModal() {
    this.isModalUpdateMemberOpen = true;
  }
}
