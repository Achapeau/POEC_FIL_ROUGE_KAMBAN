import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { ProjectService } from '../../Service/project.service';
import { User, Project } from '../../Model/model';
import { ModalComponent } from '../../modal/modal.component';
import { ModalNewProjectComponent } from '../../modal/modal-new-project/modal-new-project.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, RouterOutlet, ModalNewProjectComponent, ModalComponent, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userLog!: string;
  isActive: boolean = true;
  myUser!: Partial<User>;
  userId: number = 0;
  projects: Project[] = this.projectService.convertProjectIdsToProjects(this.userService.currentUser?.projectsIds!);
  myProjects!: Project[];
  isModalOpen = false;
  searchQuery: string = ''; // Ajout pour la gestion de la recherche

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
    this.projects = this.projectService.convertProjectIdsToProjects(this.userService.currentUser?.projectsIds!);
    this.getProject(); // Assurez-vous que la liste des projets est mise à jour au démarrage
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
        project.userIds?.includes(this.myUser.id!)
      );
    }
  }

  onSearchChange(): void {
    this.getProject(); // Mise à jour des projets filtrés lors de chaque modification de recherche
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
