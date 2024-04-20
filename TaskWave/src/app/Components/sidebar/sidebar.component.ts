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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
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
  isActive: boolean = false;
  myUser!: Partial<User>;
  userId: number = 0;
  projects!: Project[];
  myProjects!: Project[];

  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
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
}
