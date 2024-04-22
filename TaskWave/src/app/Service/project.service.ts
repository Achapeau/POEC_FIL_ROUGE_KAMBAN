import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { WrapperService } from './wrapper.service';
import { UserService } from './user.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Project, Wrapper } from '../Model/model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProject(): Project {
    return this.project;
  }

  constructor(
    public http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private wrapperService: WrapperService,
    private userService: UserService
  ) {}

  serviceURL = 'http://localhost:3050/project';

  @Input() project!: Project;
  private projectDataSubject: BehaviorSubject<Project[]> = new BehaviorSubject<
    Project[]
  >([]);
  projectData$: Observable<Project[]> = this.projectDataSubject.asObservable();
  // crud operations

  setProjectData(projectData: Project[]) {
    console.log(projectData);
    this.projectDataSubject.next(projectData);
  }

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

  deleteProject(id: number) {
    const deleteProject = this.http.delete(this.serviceURL + '/' + id);
    this.router.navigate(['project-list'], { relativeTo: this.route });
    return deleteProject;
  }

  // select project
  selectProject(project: Project) {
    this.project = project;
    this.router.navigate(['project', project.id], { relativeTo: this.route });
  }

  convertProjectIdsToProjects(projectIds: number[]): Project[] {
    let projects: Project[] = [];
    projectIds.map((id) => {
      return this.getProjectById(id).subscribe((project) => {
        projects.push(project);
      });
    });
    return projects;
  }
}
