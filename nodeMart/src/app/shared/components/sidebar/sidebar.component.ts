import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  showSideBar: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.showSideBar = !this.showSideBar; // Toggles the sidebar visibility
  }
}
