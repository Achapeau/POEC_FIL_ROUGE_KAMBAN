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
import { User, Project, Card } from '../../Model/model';
import { ModalComponent } from '../../modal/modal.component';
import { ModalNewProjectComponent } from '../../modal/modal-new-project/modal-new-project.component';
import { FormsModule } from '@angular/forms';
import { ModalUpdateUserComponent } from '../../modal/modal-update-user/modal-update-user.component';
import { CardService } from '../../Service/card.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    CommonModule,
    RouterOutlet,
    ModalNewProjectComponent,
    ModalUpdateUserComponent,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public cardService: CardService
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
  highIsOpen: boolean = false;
  mediumIsOpen: boolean = false;
  lowIsOpen: boolean = false;
  listOfTasks!: Observable<Card[]> | Card[];

  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
    this.projects = this.projectService.convertProjectIdsToProjects(
      this.userService.currentUser?.projectsIds!
    );
    this.getProject();
    this.router.events.subscribe(() => {
      this.projects = this.projectService.convertProjectIdsToProjects(
        this.userService.currentUser?.projectsIds!
      );
      this.getProject();
    });
    let arrayIdProjects: number[] = this.userService.currentUser?.projectsIds!;
    let observables = arrayIdProjects.map((id) =>
      this.cardService.getCardsByWrapperId(id)
    );
    forkJoin(observables).subscribe((data: Card[][]) => {
      this.listOfTasks = [...data[0], ...data[1]];
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
    // this.myProjects = this.projectService.getProjectsForCurrentUser();
    // this.projects = this.projectService.projects
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
    this.isModalOpenUpdateUser = true;
  }

  logout() {
    this.authService.logout();
  }

  changeHighOpen() {
    this.highIsOpen = !this.highIsOpen;
    this.mediumIsOpen = false;
    this.lowIsOpen = false;
    console.log(this.listOfTasks);
    console.log(this.projects);
  }
  changeMediumOpen() {
    this.mediumIsOpen = !this.mediumIsOpen;
    this.highIsOpen = false;
    this.lowIsOpen = false;
  }
  changeLowOpen() {
    this.lowIsOpen = !this.lowIsOpen;
    this.highIsOpen = false;
    this.mediumIsOpen = false;
  }
}
