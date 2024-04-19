import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectService } from '../../../Service/project.service';
import { UserService } from '../../../Service/user.service';
import { Project } from '../../../Model/model';
import { CommonModule } from '@angular/common';

    

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
	constructor(public projectService : ProjectService, public users : UserService) { }

  selectProject(project : Project) {
  	this.projectService.selectProject(project);
  }

	@Input() project! : Project;

}
