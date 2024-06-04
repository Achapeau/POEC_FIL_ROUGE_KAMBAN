import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-tag-dropdown',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './tag-dropdown.component.html',
  styleUrl: './tag-dropdown.component.css',
})
export class TagDropdownComponent implements OnInit {
  panelOpenState: boolean = false;

  ngOnInit(): void {
    console.log("it's working!");
  }
}
