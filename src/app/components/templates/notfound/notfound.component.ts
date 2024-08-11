import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PrimengModule } from '../../../primeng.module';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink, PrimengModule, CommonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
  hasHistory: boolean = false;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.hasHistory = window.history.length > 1;
  }

  volver(): void {
    this.location.back();
  }

  irAInicio(): void {
    this.router.navigate(['/']);
  }
}
