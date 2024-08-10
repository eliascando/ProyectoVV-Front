import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISystemParameter } from '../../../interfaces/ISystemParameter';
import { ISystemParameterDetails } from '../../../interfaces/ISystemParameterDetails';
import { Global } from '../../../global';
import { BaseCrudComponent } from '../base-crud/base-crud.component';
import { CommonModule } from '@angular/common';
import { BaseCrudDialogComponent } from '../base-crud/base-crud-dialog.component';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, ReactiveFormsModule, CommonModule, BaseCrudDialogComponent],
  providers: [ApiService],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent extends BaseCrudComponent implements OnInit {
  endpoint_get_ciclos : string;

  nameParameter: string;
  showDetails: boolean = false;
  detalles: ISystemParameterDetails[];

  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ) {
    super(api, forms);
    // Init endpoints
    this.endpoint_get = Global.API_GEL_ALL_PARAMETERS;
    this.endpoint_save = Global.API_SAVE_CURSO;
    this.endpoint_delete = Global.API_DELETE_CURSO;
    this.endpoint_update = Global.API_UPDATE_CURSO;

    this.endpoint_get_ciclos = Global.API_GET_PARAMETER_BY_ID + '2';
    
    // Formulario de nuevo
    this.formNew = this.forms.group({
      description: ['', Validators.required],
      parallel: ['', Validators.required],
      cycleId: ['', Validators.required],
      price: ['', Validators.required],
      hours: ['', Validators.required]
    });

    // Formulario de edición
    this.formEdit = this.forms.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      hours: ['', Validators.required]
    });
  }

  override ngOnInit() {
    this.loadEntities();
  }

  closeDetails() {
    this.showDetails = false;
  }

  openDetails(p: any) {
    this.showDetails = true;
    console.log(p);
    this.nameParameter = p.description;
    this.detalles = p.details;
  }
}
