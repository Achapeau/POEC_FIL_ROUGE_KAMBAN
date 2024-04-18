import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { UserDTO } from '../../Model/UserDTO';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  constructor(public userService : UserService, public authService : AuthService) { }
  userLog!: string | null;
  isActive: boolean = false
  myUser!: Partial<UserDTO>;
  userId: number = 0;
  
  ngOnInit(): void {
    this.authService.userData$.subscribe(myUser => {
      this.myUser = myUser
    })
  }
  
  toggle() {
    this.isActive = !this.isActive;
    
    console.log('before', this.myUser);
    
    this.authService.userData$.subscribe(myUser => {
      this.myUser = myUser
    })
    console.log(this.myUser.projectsIds);
    console.log('after', this.myUser);
    
    

  }

}

