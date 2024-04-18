import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { Project } from '../../Model/Project';




@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{
  constructor(public userService : UserService, public authService : AuthService) { }  
  userLog: string | null = this.authService.getToken();
  isActive: boolean = false;
  projects: Project[] = []



  
  toggle() {
    this.isActive = !this.isActive;
    this.userLog = this.authService.getToken();
    console.log(this.userLog);
    try {
      const {id} = JSON.parse(this.userLog!);
      console.log(typeof id);
      console.log(this.userService.getUserById(id));
      
      
      // this.userService.getUserById(number).subscribe((data : Project[]) => {
      //   this.projects = data;
      // });
    } catch (error) {
      console.log(error);
    }    
  }

  

}

