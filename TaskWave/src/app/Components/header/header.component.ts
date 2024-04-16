import { Component } from '@angular/core';
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
  constructor(public user : UserService) { }

  run () {
    console.log("header");
  }

  logout() {
    this.user.disconnectUser();
  }

}
