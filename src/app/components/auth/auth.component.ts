import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { MaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces/ILogin';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Importa HttpClientModule aquí
    MaterialModule,
  ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'] // Asegúrate de que sea styleUrls
})
export class AuthComponent {

  form: FormGroup;

  @Input() error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      numberIdentification: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value as ILogin).subscribe(
        res => {
          console.log(res);
          if(res.success){  
            this.router.navigate(['/home']);
          }else {
            Swal.fire({
              icon: 'error',
              text: res.message,
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
