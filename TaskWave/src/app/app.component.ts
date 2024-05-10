import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './Service/user.service';
import { ProjectListComponent } from './Components/Project/project-list/project-list.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProjectListComponent,
    HeaderComponent,
    SidebarComponent,    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'TaskWave';
  @Input() connected: boolean = true;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.connected = this.userService.connected;
  }
}
