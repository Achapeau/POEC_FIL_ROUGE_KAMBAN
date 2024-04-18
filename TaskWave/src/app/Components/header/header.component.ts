import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() sidebarToggle : boolean = false;
  constructor(public user : UserService) { }

  sidebarClick(): boolean {
    return this.sidebarToggle = !this.sidebarToggle;
  }

  run () {
    console.log("header");
  }

  logout() {
    this.user.disconnectUser();
  }

}
