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
import { themesList } from '../../Model/data';

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
  styleUrl: './modal-new-project.component.css',
})
export class ModalNewProjectComponent implements OnInit, OnChanges {

  constructor(private userService: UserService, public fb: FormBuilder, private projectService: ProjectService, private wrapperService: WrapperService, private authService: AuthService) { }
  myUser!: Partial<User>;
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  membersList!: Partial<User>[];
  themesList: Themes[] = themesList;
  
  
  public checkoutForm = this.fb.group({
    newTitle: ['', [Validators.required]],
    newTheme: [''],
    newMembers: [[0]],
    newDesciption: [''],
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
      newDesciption: '',
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
        description: this.checkoutForm.value.newDesciption as string,
        wrappersIds: [],
        userIds: memberIds,
      };
      this.wrapperService.wrappers = [];
      this.projectService.addProject(newProject).subscribe((res) => {
        
        this.userService.currentUser?.projectsIds?.push(res.id!);
            
        console.log("this.projectService.projects");
        console.log(this.projectService.projects);
        this.projectService.projects.push(res);
        // this.sidebarComponent.projects.push(res);
        console.log(this.projectService.projects);
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
    this.isOpenChange.emit(this.isOpen); 
  }

}
