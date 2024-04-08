import { Component } from '@angular/core';
import { WrapperService } from '../../Service/wrapper.service';
import { Wrapper } from '../../Model/Wrapper';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../Model/Project';
import { ProjectService } from '../../Service/project.service';
import { CdkDropListGroup} from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent {
  project! : Project;
  projectId : number;
  wrappersList : Wrapper[] = [];
  newTitle! : string;
	
constructor(public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {
  this.projectId = this.route.snapshot.params['id'];
  this.wrappersList = this.getWrappers(this.projectId); 
  this.project = this.projectService.getProject();
}
onNgOnInit() : void {
  console.log(this.projectId);
  console.log(this.project);
}
  getWrappers(id : number) : Wrapper[] {
      this.wrapperService.getWrappersByProjectId(id).subscribe((response:Wrapper[]) => {
        this.projectId = id;
        return this.wrappersList = response;
    });
    return [];
  }
}
