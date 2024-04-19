import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { ProjectService } from '../../Service/project.service';
import { User, Project } from '../../Model/model';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{

  constructor(public userService : UserService, public authService : AuthService, public projectService : ProjectService) { }
  userLog!: string;
  isActive: boolean = false
  myUser!: Partial<User>;
  userId: number = 0;
  myProjects!: Project[];

  // getProjects() {
  //   this.myProjects = this.myUser.projectsIds?.map((id?) => {
  //     return this.projectService.getProjectById(id!)
  //   })
  // }
  
  
  toggle() {
    this.isActive = !this.isActive;    
    this.authService.userData$.subscribe(myUser => {
      this.myUser = myUser;
    })
    this.projectService.projectData$.subscribe(myProjects => {
      this.myProjects = myProjects;
    })
    // this.getProjects();
    console.log(this.myProjects);    
  }
}
