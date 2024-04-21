import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  connected: boolean = true;
  @Output() sidebarToggle: boolean = false;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connected = this.userService.connected;
    console.log("header connected" + this.connected);
  }


  sidebarClick(): boolean {
    return (this.sidebarToggle = !this.sidebarToggle);
  }

  run() {
    console.log('header');
  }

  logout() {
    this.userService.disconnectUser();
  }

  goHomework() {
    this.router.navigate(['project-list'], { relativeTo: this.route });
  }
}
