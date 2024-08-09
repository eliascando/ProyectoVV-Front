import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { PrimeIcons } from 'primeng/api';
import { Global } from '../../../global';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


interface Menu {
  path: string;
  icon: string;
  name: string;
  active: boolean;
  roles: any[];
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
    RouterModule,
    HttpClientModule
  ],
  providers: [AuthService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent implements OnInit {

  menu: Menu[];

  constructor(private authServ: AuthService, private router: Router){
    this.menu = Global.MENU;
  }

  ngOnInit() {
    // Actualiza el menú activo basado en la ruta actual al iniciar
    this.updateActiveMenu(this.router.url);

    // Escucha cambios de navegación y actualiza el menú activo
    this.router.events.subscribe(event=> {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu(event.urlAfterRedirects);
      }
    });
  }

  updateActiveMenu(url: string) {
    this.menu.forEach(item => {
      item.active = url.includes(item.path);
    });
  }

  logout() {
    this.authServ.logout();
  }

  changeMenu(m: Menu) {
    this.router.navigate([m.path]);
  }
}
