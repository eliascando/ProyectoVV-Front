import { Component, OnInit } from '@angular/core';
import { BaseCrudComponent } from '../base-crud/base-crud.component';
import { PrimengModule } from '../../../primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Global } from '../../../global';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent extends BaseCrudComponent implements OnInit {
  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ){ 
    super(api, forms);

    // Endpoints
    this.endpoint_get = Global.API_GET_ESTUDIANTES;
    this.endpoint_save = Global.API_SAVE_ESTUDIANTE;
    this.endpoint_delete = Global.API_DELETE_USUARIO;
    this.endpoint_update = Global.API_UPDATE_USUARIO;

    // Formulario de nuevo
    this.formNew = this.forms.group({
      numberIdentification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [2] // Estudiante
    });

    // Formulario de edición
    this.formEdit = this.forms.group({
      email: [''],
      phone: [''],
      adress: [''],
      password: [''],
      roleId: [2] // Estudiante
    });
  }

  override ngOnInit() {
    this.loadEntities();
  }
}
