import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { WrapperService } from './wrapper.service';
import { UserService } from './user.service';
import { Project } from '../Model/model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProject(): Observable<Project> {
    let proj = new Observable<Project>((observer) => {
      observer.next(this.project);
    });
    return proj;
  }

  constructor(
    public http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private wrapperService: WrapperService,
    private userService: UserService,
    private cookieService: CookieService
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

  deleteProject(id: number): Observable<void> {
    if (
      this.userService.currentUser &&
      this.userService.currentUser.projectsIds
    ) {
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
    this.cookieService.set('project', project.id.toString());
    this.getProjectById(project.id).subscribe((project) => {
      this.project = project;
      this.wrapperService.convertIdListToWrapperList(
        project.wrappersIds as number[]
      );
      if (this.router.url === '/project') {
        this.router
          .navigate(['temporary-route'], { relativeTo: this.route })
          .then(() => {
            this.router.navigate(['project'], { relativeTo: this.route });
          });
      } else {
        this.router.navigate(['project'], { relativeTo: this.route });
      }
    });
    // this.wrapperService.wrappers = []
    // project.wrappersIds.map((id) => {
    //   this.wrapperService.getWrapperById(id).subscribe((wrapper) => {
    //     this.wrapperService.wrappers.push(wrapper);
    //   });
    // })
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
    this.projects = this.convertProjectIdsToProjects(
      this.userService.currentUser?.projectsIds as number[]
    );
    return this.projects;
  }
}
