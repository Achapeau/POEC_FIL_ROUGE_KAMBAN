import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../Service/project.service';
import { Project, User } from '../../Model/model';
import { UserService } from '../../Service/user.service';
import { CommonModule } from '@angular/common';
import { WrapperListComponent } from '../../Components/Wrapper/wrapper-list/wrapper-list.component';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-modal-update-project-member',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-update-project-member.component.html',
  styleUrl: './modal-update-project-member.component.css'
})
export class ModalUpdateProjectMemberComponent implements OnInit, OnChanges {
  constructor(public fb: FormBuilder, private projectService: ProjectService, private userService: UserService, private wrapperListComponent: WrapperListComponent, private authService: AuthService) { }
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  membersList!: Partial<User>[];
  currentUserId!: number;
  
  
  public checkoutForm = this.fb.group({
    newMembers: [[0]],
  });

  ngOnInit(): void {
    this.currentUserId = this.userService.currentUser?.id!;
    this.userService.getUsers().subscribe((membersList) => {
      this.membersList = membersList;
    });
  }

  ngOnChanges(): void {
    this.checkoutForm.reset({
      newMembers: this.projectService.project.userIds,
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      let memberIds: number[] = [];
      memberIds.push(this.currentUserId);
      this.checkoutForm.value.newMembers
      ?.filter((id) => id !== this.currentUserId)
        .forEach((id) => {
          memberIds.push(id as number);
          console.log(memberIds);
        });

      let newProject: Project = this.projectService.project;
      newProject.userIds = memberIds;
      this.projectService.updateProject(newProject).subscribe((project) => {
        this.projectService.project = project;
        this.wrapperListComponent.loadProjectDetails(project);
        this.closeModal();
      })
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
