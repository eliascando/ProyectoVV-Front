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
import { INewUser } from '../../../interfaces/INewUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ConfirmationService, MessageService, ApiService, DialogService],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})

export class MatriculaComponent extends BaseCrudComponent implements OnInit {

  endpoint_save2 : string;
  
  // obtener usuarios
  endpoint_get_docentes : string;
  enpoint_get_estudiantes : string;
  
  // obtener dropdowns
  endpoint_get_tipo_matricula : string;
  endpoint_get_ciclos : string;
  endpoint_get_cursos : string;

  tipo_matricula: number;
  enable_curso: boolean = false;

  cursos: ICursoData[];
  estudiantes: INewUser[];
  docentes: INewUser[];

  ciclos: ISystemParameterDetails[];
  tiposMatricula: ISystemParameterDetails[];

  ref: DynamicDialogRef | undefined;

  constructor(
    private api: ApiService,
    private forms: FormBuilder
  ) {
    super(api, forms);
    // Init endpoints
    this.endpoint_get = Global.API_GET_MATRICULAS;
    this.endpoint_delete = Global.API_DELETE_CURSO;
    this.endpoint_update = Global.API_UPDATE_CURSO;
    this.enpoint_get_estudiantes = Global.API_GET_ESTUDIANTES;
    this.endpoint_get_docentes = Global.API_GET_DOCENTES;
    this.endpoint_get_cursos = Global.API_GET_CURSOS;
    
    this.endpoint_get_ciclos = Global.API_GET_PARAMETER_BY_ID + '2';
    this.endpoint_get_tipo_matricula = Global.API_GET_PARAMETER_BY_ID + '3';
    // Formulario de nuevo
    this.formNew = this.forms.group({
      courseId: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  override ngOnInit() {
    this.loadEntities();
  }

  changeTipoMatricula(event: any) {
    console.log(event.value);
    this.tipo_matricula = event.value;
    this.enable_curso = true;
    if (this.tipo_matricula == 9) {
      this.loadDocentes();
      this.endpoint_save = Global.API_SAVE_MATRICULA_DOCENTE;
    } else if (this.tipo_matricula == 10) {
      this.loadEstudiantes();
      this.endpoint_save = Global.API_SAVE_MATRICULA_ESTUDIANTE;
    }
  }

  loadDropDowns(){
    this.loadCursos();
    this.loadMatriculasType();
  }

  loadCursos() {
    this.api.get(Global.API_GET_CURSOS).subscribe(
      res => {
        this.cursos = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadMatriculasType() {
    this.api.get(this.endpoint_get_tipo_matricula).subscribe(
      res => {
        console.log(res);
        const systemParameter: ISystemParameter = res.data;
        this.tiposMatricula = systemParameter.details;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadEstudiantes() {
    this.api.get(this.enpoint_get_estudiantes).subscribe(
      res => {
        this.estudiantes = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadDocentes() {
    this.api.get(this.endpoint_get_docentes).subscribe(
      res => {
        this.docentes = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
