import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Wrapper } from '../Model/Wrapper';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {
  @Input() projectId! : number;
  @Input() wrappers : Wrapper[] = [];
  wrapper!: Wrapper;
  constructor(public http : HttpClient, private router : Router, private route : ActivatedRoute) { }

  serviceURL = 'http://localhost:3050/wrapper';
  // crud operations

  // get wrapper by id
  getWrapperById(id : number): Observable<Wrapper> {
    return this.http.get<Wrapper>(this.serviceURL + '/' + id);
  }
  
  // add wrapper
  addWrapper(wrapper : Partial<Wrapper>) : Observable<Wrapper> {
	  return this.http.post<Wrapper>(this.serviceURL, wrapper);
  }

  // update wrapper
  updateWrapper(wrapper : Wrapper) : Observable<Wrapper>  {
	  return this.http.put<Wrapper>(this.serviceURL + '/' + wrapper.id, wrapper);
  }

  // delete wrapper

  deleteWrapper(id : number) {
	  return this.http.delete(this.serviceURL + '/' + id);
  }

}
