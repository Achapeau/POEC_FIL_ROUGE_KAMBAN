import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserDTO } from '../Model/UserDTO';
import { LogsDTO } from '../Model/LogsDTO';
import { User } from '../Model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private router : Router, private route : ActivatedRoute, private authService : AuthService) { }

  serviceURL = 'http://localhost:3050/user';

  connected : boolean = false;
  currentUser : UserDTO | null = null;


  // get user by id

  getUserById(id : number): Observable<UserDTO> {
	return this.http.get<UserDTO>(this.serviceURL + '/' + id);
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
		this.currentUser = data;
		this.connected = true;
		this.router.navigate(['project-list'], { relativeTo: this.route });
		this.authService.setToken(JSON.stringify({mail: this.currentUser.email, id: this.currentUser.id}));
		this.authService.setUserData(data)
	  }
	);
  }
  inscription(userDTO : UserDTO) {
	this.http.post<UserDTO>(this.serviceURL + '/register', userDTO).subscribe(
	  (data : UserDTO) => {
		console.log(data);
		this.currentUser = data;
		this.connected = true;
		this.router.navigate(['project-list'], { relativeTo: this.route });
	  }
	);
  }


  // Disconnect user
  disconnectUser() {
	localStorage.removeItem('currentUser');
	this.currentUser = null;
	this.connected = false;
  }

}
