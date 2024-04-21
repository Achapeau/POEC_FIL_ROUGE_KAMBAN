import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project, Themes, User } from '../../../Model/model';
import { ModalComponent } from '../../../modal/modal.component';
import { ProjectService } from '../../../Service/project.service';
import { AuthService } from '../../../Service/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { ModalNewProjectComponent } from '../../../modal/modal-new-project/modal-new-project.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    ModalComponent,
    ReactiveFormsModule,
    ModalNewProjectComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnChanges {
  projects: Project[] = [];
  @Input() isOpenChange!: boolean;
  isModalOpen: boolean = this.isOpenChange;
  myUser!: Partial<User>;
  membersList!: Partial<User>[];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.getProject();
  }


  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
    this.userService.getUsers().subscribe((membersList) => {
      this.membersList = membersList;
    });
    this.projectService
      .getProject()
      .userIds.map((id) =>
        this.userService
          .getUserById(id)
          .subscribe((user) => this.membersList.push(user))
      );
    console.log(this.membersList);
  }

  ngOnChanges(): void {
  }

  getProject() {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data.filter((project) =>
        project.userIds?.includes(this.myUser.id!)
      );
    });
  }

  openCreateProjectModal() {
    this.isModalOpen = true;
  }
  
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
