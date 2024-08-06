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
import { IMatriculaData } from '../../../interfaces/IMatriculaData';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, FormsModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService, ApiService, DialogService],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})

export class MatriculaComponent extends BaseCrudComponent implements OnInit {

  endpoint_get_ciclos : string;
  endpoint_save2 : string;

  cursos: ICursoData[];
  estudiantes: any[];

  ref: DynamicDialogRef | undefined;

  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ) {
    super(api, forms);
    // Init endpoints
    this.endpoint_get = Global.API_GET_MATRICULAS;
    this.endpoint_save = Global.API_SAVE_MATRICULA_DOCENTE;
    this.endpoint_save2 = Global.API_SAVE_MATRICULA_ESTUDIANTE;
    this.endpoint_delete = Global.API_DELETE_CURSO;
    this.endpoint_update = Global.API_UPDATE_CURSO;
    
    this.endpoint_get_ciclos = Global.API_GET_PARAMETER_BY_ID + '2';
    // Formulario de nuevo
    this.formNew = this.forms.group({
      courseId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEntities();
  }

  loadCursos() {
    this.api.get(Global.API_GET_CURSOS).subscribe(
      res => {
        this.items = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadEstudiantes() {
  }

  loadDocentes() {
  }
}
