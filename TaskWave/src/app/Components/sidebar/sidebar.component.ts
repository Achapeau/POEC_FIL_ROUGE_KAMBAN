import { Component, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../Service/user.service';
import { AuthService } from '../../Service/auth.service';
import { UserDTO } from '../../Model/UserDTO';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  constructor(public userService : UserService, public authService : AuthService) { }
  @Input() value!: string;
  
  userLog!: string | null;
  isActive: boolean = false
  
  ngOnInit(): void {
    console.log(this.userLog);
       
  }
  
  toggle() {
    this.isActive = !this.isActive;
    this.userLog = this.authService.getToken()
    console.log(this.userLog);
    
  }

}

