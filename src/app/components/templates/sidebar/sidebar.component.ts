import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { PrimeIcons } from 'primeng/api';
import { Global } from '../../../global';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

interface Menu {
  path: string;
  icon: string;
  name: string;
  roles: any[]
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule, 
    ButtonModule, 
    RippleModule, 
    AvatarModule, 
    StyleClassModule, 
    CommonModule, 
    RouterLink, 
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {

  menu : Menu[];

  constructor(private authServ: AuthService){
    this.menu = Global.MENU;
  }

  logout(){
    this.authServ.logout();
  }

}