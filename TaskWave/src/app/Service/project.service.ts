import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { WrapperService } from './wrapper.service';
import { UserService } from './user.service';
import { Project } from '../Model/model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProject(): Observable<Project> {
    let proj = new Observable<Project>(observer => {
      observer.next(this.project);
    });
    return proj;
  }

  constructor(
    public http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private wrapperService: WrapperService,
    private userService: UserService
  ) {}

  serviceURL = 'http://localhost:3050/project';

  project!: Project;
  projects!: Project[];
  // private projectDataSubject: BehaviorSubject<Project[]> = new BehaviorSubject<
  //   Project[]
  // >([]);
  // projectData$: Observable<Project[]> = this.projectDataSubject.asObservable();

  // crud operations

  // setProjectData(projectData: Project[]) {
  //   console.log(projectData);
  //   this.projectDataSubject.next(projectData);
  // }

  // get all project
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.serviceURL);
  }

  // get project by id
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(this.serviceURL + '/' + id);
  }

  // getProjectsByArrayOfId(ids : number[]){
  //   const dataProject = ids.map(id => this.getProjectById(id));
  //   this.setProjectData(dataProject);

  // }

  // add project
  addProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.serviceURL, project);
  }

  // update project
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.serviceURL + '/' + project.id, project);
  }

  // delete project

  deleteProject(id: number) : Observable<void> {
    if (this.userService.currentUser && this.userService.currentUser.projectsIds) {
      const index = this.userService.currentUser.projectsIds.indexOf(id);
      if (index !== -1) {
        this.userService.currentUser.projectsIds.splice(index, 1);
      }
    }
    return this.http.delete<void>(this.serviceURL + '/' + id);
  }

  redirectToProjectList() {
    this.router.navigate(['project-list'], { relativeTo: this.route });
  }

  // select project
  selectProject(project: Project) {
    this.project = project;
    this.wrapperService.convertIdListToWrapperList(project.wrappersIds as number[]);
    // this.wrapperService.wrappers = []
    // project.wrappersIds.map((id) => {
    //   this.wrapperService.getWrapperById(id).subscribe((wrapper) => {
    //     this.wrapperService.wrappers.push(wrapper);
    //   });
    // })
    this.router.navigate(['project', project.id], { relativeTo: this.route });
  }

  convertProjectIdsToProjects(projectIds: number[]): Project[] {
    let projects: Project[] = [];
    projectIds.map((id) => {
      return this.getProjectById(id).subscribe((project) => {
        projects.push(project);
      });
    });
    this.projects = projects;
    return projects;
  }
  getProjectsForCurrentUser(): Project[] {
    this.projects = this.convertProjectIdsToProjects(this.userService.currentUser?.projectsIds as number[]);
    return this.projects;
  }
}
