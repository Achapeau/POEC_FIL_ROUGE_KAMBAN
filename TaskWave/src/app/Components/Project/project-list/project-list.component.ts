import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project, Themes, User } from '../../../Model/model';
import { ModalComponent } from '../../../modal/modal.component';
import { ProjectService } from '../../../Service/project.service';
import { AuthService } from '../../../Service/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnChanges {
  projects: Project[] = [];
  isModalOpen = false;
  myUser!: Partial<User>;
  membersList!: Partial<User>[];
  themesList: Themes[] = [
    {
      name: 'Island',
      background:
        'https://cdn.pixabay.com/photo/2024/02/21/08/06/coast-8587004_1280.jpg',
    },
    {
      name: 'Canada',
      background:
        'https://cdn.pixabay.com/photo/2021/01/08/07/52/trees-5899195_1280.jpg',
    },
    {
      name: 'Bali',
      background:
        'https://cdn.pixabay.com/photo/2018/06/22/08/24/emotions-3490223_1280.jpg',
    },
    {
      name: 'Sand wave',
      background:
        'https://cdn.pixabay.com/photo/2020/08/31/09/33/beach-5531919_1280.jpg',
    },
  ];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    public fb: FormBuilder,
    private userService: UserService
  ) {
    this.getProject();
  }

  public checkoutForm = this.fb.group({
    newTitle: ['', [Validators.required]],
    newTheme: [''],
    newMembers: [[0]],
    // newDesciption: [''],
  });

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
    this.checkoutForm.reset({
      newMembers: [0],
      newTheme: '',
      newTitle: '',
      // newDesciption: '',
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
      let memberIds: number[] = [];
      memberIds.push(this.myUser.id!);
      this.checkoutForm.value.newMembers
        ?.filter((id) => id !== this.myUser.id)
        .forEach((id) => {
          memberIds.push(id as number);
        });

      let newProject: Partial<Project> = {
        title: this.checkoutForm.value.newTitle as string,
        background: this.checkoutForm.value.newTheme as string,
        wrappersIds: [],
        userIds: memberIds,
        // description: this.checkoutForm.value.newDesciption as string
      };
      console.log(newProject);

      this.projectService.addProject(newProject).subscribe((res) => {
        console.log(res);
      });
      this.closeModal();
    } else {
      alert('Formulaire invalide');
    }
  }
}
