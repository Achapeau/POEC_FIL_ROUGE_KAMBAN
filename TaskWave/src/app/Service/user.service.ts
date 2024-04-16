import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserDTO } from '../Model/UserDTO';
import { LogsDTO } from '../Model/LogsDTO';
import { User } from '../Model/User';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private router : Router, private route : ActivatedRoute) { }

  serviceURL = 'http://localhost:3050/user';

  connected : boolean = false;
  currentUser : UserDTO | null = null;


  // get user by id

  getUserById(id : number): UserDTO | null {
	this.http.get<UserDTO>(this.serviceURL + '/' + id).subscribe((user : UserDTO) => {
	  this.currentUser = user;
	  return user;
	});
	return null;
  }
  // update user
  updateUser(user: User) : Observable<User> {
	return this.http.put<User>(this.serviceURL + '/' + user.id, user);
  }

  convertUserToUserDTO(user : User) : UserDTO {
	let userDTO : UserDTO = {
	  id : user.id,
	  email : user.email,
	  password : user.password,
	  firstname : user.firstname,
	  lastname : user.lastname,
	  projectsIds : user.projects?.map(project => project.id)
	};
	return userDTO;
  }

  // Connect user
  connectUser(logDTO : LogsDTO)  {
	this.http.post<UserDTO>(this.serviceURL + '/login', logDTO).subscribe(
	  (data : UserDTO) => {
		console.log(data);
		this.currentUser = {
		  id : data.id!,
		  email : data.email!,
		  password : data.password!,
		  firstname : data.firstname!,
		  lastname : data.lastname!,
		  projectsIds : data.projectsIds!
		};
		this.connected = true;
		this.router.navigate(['project-list'], { relativeTo: this.route });
	  }
	);
  }
  inscription(userDTO : UserDTO) {
	this.http.post<UserDTO>(this.serviceURL + '/register', userDTO).subscribe(
	  (data : UserDTO) => {
		console.log(data);
		this.currentUser = {
		  id : data.id!,
		  email : data.email!,
		  password : data.password!,
		  firstname : data.firstname!,
		  lastname : data.lastname!,
		  projectsIds : data.projectsIds!
		}
		this.connected = true;
		this.router.navigate(['project-list'], { relativeTo: this.route });
	  }
	);
  }


  // Disconnect user
  disconnectUser() {
	this.currentUser = null;
	this.connected = false;
  }

}
