import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Wrapper } from '../Model/model';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {
  @Input() wrappers : Wrapper[] = [];
  constructor(public http : HttpClient) { }

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

  convertIdListToWrapperList(wrapperIds: number[]) {
    this.wrappers = [];
    wrapperIds.map(id => {
      this.getWrapperById(id).subscribe((data : Wrapper) => {
        this.wrappers.push(data);
        this.wrappers.sort((a, b) => a.position - b.position);
      })
    })
  }

}
