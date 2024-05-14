import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../Service/project.service';
import { Project, Themes } from '../../Model/model';
import { themesList } from '../../Model/data';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-update-project',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './modal-update-project.component.html',
  styleUrl: './modal-update-project.component.css'
})
export class ModalUpdateProjectComponent implements OnInit, OnChanges {
  constructor(public fb: FormBuilder, private projectService: ProjectService) { }
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  themesList: Themes[] = themesList;
  
  
  public checkoutForm = this.fb.group({
    newTitle: ['', [Validators.required]],
    newDesciption: ['', [Validators.required]],
    newTheme: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.checkoutForm.reset({
      newTitle: this.projectService.project?.title,
      newDesciption: this.projectService.project?.description,
      newTheme: this.projectService.project?.background,
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      let newProject: Project = this.projectService.project;
      newProject.title = this.checkoutForm.value.newTitle as string;
      newProject.description = this.checkoutForm.value.newDesciption as string;
      newProject.background = this.checkoutForm.value.newTheme as string;
      this.projectService.updateProject(newProject).subscribe(() => {
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
