import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectService } from '../../../Service/project.service';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../project/project.component';
import { Project } from '../../../Model/Project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
	constructor(public projectService : ProjectService) {
		this.getProjects();
	}

	projectsList : Project[] = [];

	getProjects() {
		this.projectService.getProjects().subscribe((data: Project[]) => {
			this.projectsList = data;
		});
	}
}
