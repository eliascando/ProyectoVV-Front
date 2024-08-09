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

  constructor(private authServ: AuthService){}

  ngOnInit(){
    this.user = this.authServ.getUser();
  }

  getActualPath(){
    var path = window.location.pathname.substring(1);
    let splitPath = path.split('/');
    if (splitPath.length > 1){
      return splitPath[1].toUpperCase();
    } else {
      return path.toUpperCase();
    }
  }

}
