import { Component } from '@angular/core';
import { WrapperService } from '../../Service/wrapper.service';
import { Wrapper } from '../../Model/Wrapper';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../Model/Project';
import { ProjectService } from '../../Service/project.service';
import { CdkDropListGroup} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent {
  projectId : number = 0;
  project! : Project;
  wrappersList : Wrapper[] = [];
	
constructor(public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {
  this.projectId = this.route.snapshot.params['id'];
  this.wrappersList = this.getWrappers(this.projectId); 
  this.projectService.getProjectById(this.projectId).subscribe((response:Project) => {
    return this.project = response;
  })
}
  getWrappers(id : number)  {
      this.wrapperService.getWrappersByProjectId(id).subscribe((response:Wrapper[]) => {
        return this.wrappersList = response;
    });
    return [];
  }
}
