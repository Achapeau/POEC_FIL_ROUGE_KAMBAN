import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from '../Model/Project';
import { WrapperComponent } from '../Components/Wrapper/wrapper/wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WrapperDTO } from '../Model/WrapperDTO';
import { Wrapper } from '../Model/Wrapper';
import { map } from 'rxjs/operators';
import { ProjectDTO } from '../Model/ProjectDTO';
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
  wrappers : Observable<Wrapper[]> = new Observable<Wrapper[]>();
  @Input() project!: Project;
  // crud operations

  // get all project
  getProjects() : Observable<Project[]> {
	return this.http.get<Project[]>(this.serviceURL);
  }

  // get project by id
  getProjectById(id : number): Project {
    this.http.get<ProjectDTO>(this.serviceURL + '/' + id).subscribe((project : ProjectDTO) => {
      this.project = this.convertToProject(project);
    });
    return this.project;
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
    // this.wrappers = this.getWrappersByProjectId(project.id);
    // const body = { project: project, wrappers: this.wrappers };
  	// this.router.navigate(['tab', this.wrappers], { relativeTo: this.route });
    this.project = project;
    this.router.navigate(['tab',project.id], { relativeTo: this.route });
  }

  getWrappersByProjectId(id: number): Observable<Wrapper[]> {
    return this.http.get<Wrapper[]>('http://localhost:3050/wrapper/project/' + id);
  }

  convertToProjectDTO(project : Project) : ProjectDTO {
    let projectDTO : ProjectDTO = {
      id: project.id,
      title: project.title,
      description: project.description,
      background: project.background,
      wrappersIds: project.wrappersIds,
      userIds: project.users.map((user) => user.id) as number[] || []
    }
    return projectDTO;
  }

  convertToProject(projectDTO : ProjectDTO) : Project {
    let project : Project = {
      id: projectDTO.id as number,
      title: projectDTO.title,
      description: projectDTO.description,
      background: projectDTO.background,
      wrappersIds: projectDTO.wrappersIds,
      users: projectDTO.userIds?.map((id) => this.userService.getUserById(id) || null) as UserDTO[] || []
    }
    return project;
  }
}
