import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-shared-layout',
  imports: [RouterOutlet , HeaderComponent , FooterComponent],
  templateUrl: './shared-layout.component.html',
  styleUrl: './shared-layout.component.scss'
})
export class SharedLayoutComponent {

}
