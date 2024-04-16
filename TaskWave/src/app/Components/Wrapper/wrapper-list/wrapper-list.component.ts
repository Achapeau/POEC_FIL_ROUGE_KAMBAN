import { Component, Input, OnInit } from '@angular/core';
import { WrapperService } from '../../../Service/wrapper.service';
import { Wrapper } from '../../../Model/Wrapper';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../Model/Project';
import { ProjectService } from '../../../Service/project.service';
import { CdkDropListGroup} from '@angular/cdk/drag-drop';
import { WrapperCreateComponent } from '../wrapper-create/wrapper-create.component';
import { Observable, forkJoin } from 'rxjs';
@Component({
  selector: 'app-wrapper-list',
  standalone: true,
  imports: [CommonModule, WrapperComponent, CdkDropListGroup, WrapperCreateComponent],
  templateUrl: './wrapper-list.component.html',
  styleUrl: './wrapper-list.component.css'
})
export class WrapperListComponent implements OnInit {
  @Input() project! : Project;
  // @Input() projectDTO! : ProjectDTO;
  @Input() projectId! : number;
  @Input() wrappersId! : number[];
  @Input() wrappersList : Wrapper[] = [];
  newTitle! : string;
	
constructor(public wrapperService : WrapperService, public projectService : ProjectService, private route: ActivatedRoute) {
  
}
ngOnInit() : void {
  this.projectId = this.route.snapshot.params['id'];
  this.project = this.projectService.getProjectById(this.projectId);
  console.log(this.project.wrappersIds);
  this.getWrappers();
}
  
  getWrappers(): void {
    const observables = this.projectService.project.wrappersIds.map(id => this.wrapperService.getWrapperById(id));
    
    forkJoin(observables).subscribe((data: Wrapper[]) => {
      this.wrappersList = data;
    });
  }
}
