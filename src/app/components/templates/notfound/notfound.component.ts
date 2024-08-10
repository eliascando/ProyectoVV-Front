import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PrimengModule } from '../../../primeng.module';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink, PrimengModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

}
