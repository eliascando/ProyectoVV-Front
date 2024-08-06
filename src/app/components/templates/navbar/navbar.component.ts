import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IUserData } from '../../../interfaces/IUserData';
import { HttpClientModule } from '@angular/common/http';
import { Global } from '../../../global';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule],
  providers:[AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: IUserData;

  constructor(private authServ: AuthService){
    this.user = authServ.getUser();
  }

  getActualPath(){
    return Global.getActualPath().toUpperCase();
  }

}
