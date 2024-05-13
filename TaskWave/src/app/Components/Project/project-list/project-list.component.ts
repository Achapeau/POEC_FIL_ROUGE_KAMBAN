import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project, Themes, User } from '../../../Model/model';
import { ModalComponent } from '../../../modal/modal.component';
import { ProjectService } from '../../../Service/project.service';
import { AuthService } from '../../../Service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import { ModalNewProjectComponent } from '../../../modal/modal-new-project/modal-new-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    ModalComponent,
    ReactiveFormsModule,
    ModalNewProjectComponent,
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnChanges {
  projects: Project[] = this.projectService.projects;
  @Input() isOpenChange!: boolean;
  isModalOpen: boolean = this.isOpenChange;
  myUser!: User
  membersList!: Partial<User>[];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getToken() !== null) {            
      let token = this.authService.decodeToken();
      this.userService.getUserByEmail(token?.sub as string).subscribe((user) => {
        this.myUser = user;
        this.userService.setCurrentUser(this.myUser);
        this.getProjects();
      });
      this.userService.connected = true;
    } else {
      this.route.navigate(['connexion']);
    }    
  }

  ngOnChanges(): void {}

  getProjects() {
    this.projects = this.projectService.getProjectsForCurrentUser();
    this.projectService.projects = this.projects;
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
