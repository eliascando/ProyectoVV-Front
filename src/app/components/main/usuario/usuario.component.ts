import { Component, OnInit } from '@angular/core';
import { BaseCrudComponent } from '../base-crud/base-crud.component';
import { PrimengModule } from '../../../primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Global } from '../../../global';
import { BaseCrudDialogComponent } from "../base-crud/base-crud-dialog.component";
import { ISystemParameter } from '../../../interfaces/ISystemParameter';
import { ISystemParameterDetails } from '../../../interfaces/ISystemParameterDetails';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule, 
    PrimengModule, 
    BaseCrudDialogComponent, 
    BaseCrudComponent,
    HttpClientModule, 
    ReactiveFormsModule 
  ],
  providers: [ApiService],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent extends BaseCrudComponent implements OnInit{

  endpoint_get_roles: string;
  roles: ISystemParameterDetails[];

  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ){ 
    super(api, forms);

    // Endpoints
    this.endpoint_get = Global.API_GET_USUARIOS;
    this.endpoint_save = Global.API_SAVE_USUARIO;
    this.endpoint_delete = Global.API_DELETE_USUARIO;
    this.endpoint_update = Global.API_UPDATE_USUARIO;

    this.endpoint_get_roles = Global.API_GET_PARAMETER_BY_ID + '1';

    // Formulario de nuevo
    this.formNew = this.forms.group({
      numberIdentification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roleId: ['', Validators.required]
    });

    // Formulario de edición
    this.formEdit = this.forms.group({
      email: [''],
      phone: [''],
      adress: [''],
      password: [''],
      roleId: ['', Validators.required]
    });
  }

  override ngOnInit() {
    this.loadEntities();
  }

  
  loadRoles() {
    this.api.get(this.endpoint_get_roles).subscribe(
      res => {
        const systemParameter: ISystemParameter = res.data;
        this.roles = systemParameter.details;
      },
      err => {
        console.log(err);
      }
    );
  }
}
