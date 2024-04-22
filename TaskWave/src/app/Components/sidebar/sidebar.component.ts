import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { ProjectService } from '../../Service/project.service';
import { User, Project } from '../../Model/model';
import { ModalComponent } from '../../modal/modal.component';
import { ModalNewProjectComponent } from '../../modal/modal-new-project/modal-new-project.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, RouterOutlet, ModalNewProjectComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnChanges {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  userLog!: string;
  isActive: boolean = true;
  myUser!: Partial<User>;
  userId: number = 0;
  projects: Project[] = this.projectService.projects;

  myProjects!: Project[];
  isModalOpen = false;

  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
    this.projects = this.projectService.convertProjectIdsToProjects(this.myUser.projectsIds!);
    this.projectService.projects = this.projects;
  }

  ngOnChanges(): void {
    console.log(this.projects);
  }

  getProject() {
    this.myProjects = this.projects.filter((project) =>
      project.userIds?.includes(this.myUser.id!)
    );
  }

  toggle() {
    this.isActive = !this.isActive;
    this.getProject();
  }

  selectProject(project: Project) {
    this.projectService.selectProject(project);
  }

  goHomework() {
    this.router.navigate(['project-list'], { relativeTo: this.route });
  }

  openCreateProjectModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  logout() {
    this.userService.disconnectUser();
  }
}
