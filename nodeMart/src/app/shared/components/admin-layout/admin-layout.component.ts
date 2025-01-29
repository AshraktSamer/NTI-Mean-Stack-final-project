import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../../../admin/components/dashboard/dashboard.component";

@Component({
  selector: 'app-admin-layout',
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterOutlet, DashboardComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
