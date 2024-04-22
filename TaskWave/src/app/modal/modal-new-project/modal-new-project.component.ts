import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, Themes, User } from '../../Model/model';
import { ProjectService } from '../../Service/project.service';
import { AuthService } from '../../Service/auth.service';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../../Components/Project/project/project.component';
import { ModalComponent } from '../modal.component';
import { UserService } from '../../Service/user.service';
import { WrapperService } from '../../Service/wrapper.service';

@Component({
  selector: 'app-modal-new-project',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-new-project.component.html',
  styleUrl: './modal-new-project.component.css'
})
export class ModalNewProjectComponent implements OnInit, OnChanges {

  constructor(private userService: UserService, public fb: FormBuilder, private projectService: ProjectService, private wrapperService: WrapperService, private authService: AuthService) { }
  myUser!: Partial<User>;
  @Input() isOpen = true;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  }
  ngOnChanges(): void {
    this.checkoutForm.reset({
      newMembers: [0],
      newTheme: '',
      newTitle: '',
      // newDesciption: '',
    });
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
      this.wrapperService.wrappers = [];
      this.projectService.addProject(newProject).subscribe((res) => {
        this.projectService.selectProject(res);
      });
      this.closeModal();
    } else {
      alert('Formulaire invalide');
    }
  }
  
  openModal(): void {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

}
