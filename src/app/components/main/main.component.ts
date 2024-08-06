import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimengModule } from '../../primeng.module';
import { SidebarComponent } from "../templates/sidebar/sidebar.component";
import { NavbarComponent } from "../templates/navbar/navbar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    PrimengModule,
    SidebarComponent,
    NavbarComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
