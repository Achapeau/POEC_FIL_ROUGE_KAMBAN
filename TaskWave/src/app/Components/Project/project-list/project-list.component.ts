import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project, User } from '../../../Model/model';
import { ModalComponent } from '../../../modal/modal.component';
import { ProjectService } from '../../../Service/project.service';
import { AuthService } from '../../../Service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectComponent, ModalComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isModalOpen = false;
  myUser!: Partial<User>;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    public fb: FormBuilder
  ) {
    this.getProject();
  }

  public checkoutForm = this.fb.group({
    newTitle: ['', [Validators.required]],
    newTheme: [0],
    newMembers: [null],
  });

  ngOnInit(): void {
    this.authService.userData$.subscribe((myUser) => {
      this.myUser = myUser;
    });
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

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Titre : ', this.checkoutForm.value.newTitle);
    } else {
      console.log('Formulaire invalide');
    }
  }
}
