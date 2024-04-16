import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from '../Model/Project';
import { WrapperComponent } from '../Components/Wrapper/wrapper/wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Wrapper } from '../Model/Wrapper';
import { map } from 'rxjs/operators';
import { WrapperService } from './wrapper.service';
import { User } from '../Model/User';
import { UserService } from './user.service';
import { UserDTO } from '../Model/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  getProject(): Project {
    return this.project;
  }

  constructor(public http : HttpClient, private router : Router, 
    private route : ActivatedRoute, 
    private wrapperService : WrapperService,
    private userService : UserService) { }

  serviceURL = 'http://localhost:3050/project';

  @Input() wrappers : Wrapper[] = [];
  @Input() project!: Project;
  // crud operations

  // get all project
  getProjects() : Observable<Project[]> {
	return this.http.get<Project[]>(this.serviceURL);
  }

  // get project by id
  getProjectById(id : number): Observable<Project> {
    return this.http.get<Project>(this.serviceURL + '/' + id);
  }

  // add project
  addProject(project : Project) : Observable<Project> {
	return this.http.post<Project>(this.serviceURL, project);
  }

  // update project
  updateProject(project : Project) : Observable<Project>  {
	return this.http.put<Project>(this.serviceURL + '/' + project.id, project);
  }

  // delete project

  deleteProject(id : number) {
	return this.http.delete(this.serviceURL + '/' + id);
  }

  // select project
  selectProject(project : Project) {
    this.project = project;
    this.router.navigate(['tab',project.id], { relativeTo: this.route });
  }

}
