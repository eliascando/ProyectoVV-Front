import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICursoData } from '../../../interfaces/ICursoData';
import { INewCurso } from '../../../interfaces/INewCurso';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISystemParameter } from '../../../interfaces/ISystemParameter';
import { ISystemParameterDetails } from '../../../interfaces/ISystemParameterDetails';
import { IEditCurso } from '../../../interfaces/IEditCurso';
import Swal from 'sweetalert2';
import { Global } from '../../../global';
import { BaseCrudComponent } from '../base-crud/base-crud.component';
@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService, ApiService, DialogService],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends BaseCrudComponent implements OnInit {
 
  endpoint_get_ciclos : string;

  ciclos: ISystemParameterDetails[];

  ref: DynamicDialogRef | undefined;

  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ) {
    super(api, forms);
    // Init endpoints
    this.endpoint_get = Global.API_GET_CURSOS;
    this.endpoint_save = Global.API_SAVE_CURSO;
    this.endpoint_delete = Global.API_DELETE_CURSO;
    this.endpoint_get_ciclos = Global.API_GET_PARAMETER_BY_ID + '2';
    this.endpoint_update = Global.API_UPDATE_CURSO;
    
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

  ngOnInit() {
    this.loadEntities();
    this.loadCycles();
  }

  loadCycles() {
    this.api.get(this.endpoint_get_ciclos).subscribe(
      res => {
        const systemParameter: ISystemParameter = res.data;
        this.ciclos = systemParameter.details;
      },
      err => {
        console.log(err);
      }
    );
  }
}
