import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Wrapper } from '../Model/Wrapper';
import { WrapperDTO } from '../Model/WrapperDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {
  projectId! : number;
  wrappers : Observable<Wrapper[]> = new Observable<Wrapper[]>();
  wrapper!: Observable<Wrapper> | Wrapper;
  constructor(public http : HttpClient, private router : Router, private route : ActivatedRoute) { }

  serviceURL = 'http://localhost:3050/wrapper';
  // crud operations

  // get all wrapper
  getWrappers() : Observable<Wrapper[]> {
	  return this.http.get<Wrapper[]>(this.serviceURL);
  }

  // get wrapper by project id
  getWrapperById(projectId : number): Observable<Wrapper> {
    this.wrapper = this.http.get<Wrapper>(this.serviceURL + '/' + projectId);
	  return this.http.get<Wrapper>(this.serviceURL + '/' + projectId);
  }

  // add wrapper
  addWrapper(wrapperDTO : WrapperDTO)  {
	  this.http.post<Wrapper>(this.serviceURL, wrapperDTO).subscribe(
      (data : Wrapper) => {
      console.log(data);
      }
    );
  }

  // update wrapper
  updateWrapper(wrapper : Wrapper) : Observable<Wrapper>  {
	  return this.http.put<Wrapper>(this.serviceURL + '/' + wrapper.id, wrapper);
  }

  // delete wrapper

  deleteWrapper(id : number) {
	  return this.http.delete(this.serviceURL + '/' + id);
  }

  getWrappersByProjectId(id: number): Observable<Wrapper[]> {
    this.projectId = id;
    return this.http.get<Wrapper[]>(this.serviceURL + '/' + id);
  }
  
}
