import { Component, NgModule, NgModuleDecorator } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './Service/user.service';
import { ProjectListComponent } from './Components/project-list/project-list.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SidebarService } from './Service/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectListComponent, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TaskWave';

  constructor(public userService: UserService) {
  }

}
