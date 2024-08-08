import { Component, OnInit } from '@angular/core';
import { BaseCrudComponent } from '../base-crud/base-crud.component';
import { PrimengModule } from '../../../primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Global } from '../../../global';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent extends BaseCrudComponent implements OnInit{

  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ){ 
    super(api, forms);

    // Endpoints
    this.endpoint_get = Global.API_GET_DOCENTES;
    this.endpoint_save = Global.API_SAVE_DOCENTE;
    this.endpoint_delete = Global.API_DELETE_USUARIO;
    this.endpoint_update = Global.API_UPDATE_USUARIO;

    // Formulario de nuevo
    this.formNew = this.forms.group({
      numberIdentification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [1] // Docente
    });

    // Formulario de edición
    this.formEdit = this.forms.group({
      email: [''],
      phone: [''],
      adress: [''],
      password: [''],
      roleId: [1] // Docente
    });
  }

  override ngOnInit() {
    this.loadEntities();
  }

}
