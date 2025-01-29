import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ProfileComponent } from '../../../user/components/profile/profile.component';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet , FooterComponent , HeaderComponent , ProfileComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
