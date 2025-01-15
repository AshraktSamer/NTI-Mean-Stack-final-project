import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-custom-layout',
  imports: [HeaderComponent , FooterComponent , RouterOutlet],
  templateUrl: './custom-layout.html',
  styleUrl: './custom-layout.scss'
})
export class CustomLayoutComponentComponent {

}
