import { Component, Input, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { ModalUpdateUserComponent } from '../../modal/modal-update-user/modal-update-user.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, RouterOutlet, ModalNewProjectComponent, ModalUpdateUserComponent, ModalComponent, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
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
  isModalOpenUpdateUser = false;
  searchQuery: string = '';

  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
    this.projects = this.projectService.convertProjectIdsToProjects(this.userService.currentUser?.projectsIds!);
    this.getProject();
    this.router.events.subscribe(() => {
      this.projects = this.projectService.convertProjectIdsToProjects(this.userService.currentUser?.projectsIds!);
      this.getProject();
    });
  }

  getProject() {
    if (this.searchQuery) {
      this.myProjects = this.projects.filter((project) =>
        project.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.myProjects = this.projects.filter((project) =>
        project.userIds?.includes(this.userService.currentUser?.id!)
      );
    }
  }

  onSearchChange(): void {
    this.getProject();
  }

  toggle() {
    this.isActive = !this.isActive;
    this.getProject();
  }

  selectProject(project: Project) {
    this.myProjects = this.projectService.getProjectsForCurrentUser();
    this.projects = this.projectService.projects
    this.searchQuery = '';
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
  openUpdateUserModal() {
    console.log("openUpdateUserModal");
    this.isModalOpenUpdateUser = true;
  }

  logout() {
    this.userService.disconnectUser();
  }
}
