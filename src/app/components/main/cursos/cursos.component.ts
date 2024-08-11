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
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, ReactiveFormsModule, CommonModule, BaseCrudDialogComponent],
  providers: [ApiService, AuthService],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends BaseCrudComponent implements OnInit {
 
  endpoint_get_ciclos : string;
  endpoint_get_students_: string;
  nameParameter: string;
  cursoId: number;
  cursoName: string;
  showDetails: boolean = false;
  detalles: ISystemParameterDetails[];
  estudiantes: any[];
  user: any;
  ciclos: ISystemParameterDetails[];

  constructor(
    private api: ApiService,
    private forms: FormBuilder,
    private auth: AuthService
  ) {
    super(api, forms);
    this.user = this.auth.getUser();
    // Init endpoints
    this.endpoint_get = Global.API_GET_CURSOS;
    this.endpoint_save = Global.API_SAVE_CURSO;
    this.endpoint_delete = Global.API_DELETE_CURSO;
    this.endpoint_update = Global.API_UPDATE_CURSO;

    this.endpoint_get_ciclos = Global.API_GET_PARAMETER_BY_ID + '2';
    this.endpoint_get_students_ = Global.API_GET_ESTUDIANTE_BY_CURSO_ID;
    
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
    if(this.user.roleName == 'DOC'){
      this.endpoint_get = Global.API_GET_CURSOS_BY_DOCENTE_ID + this.user.id;
    }
    this.loadEntities();
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

  loadStudents() {
    this.api.get(this.endpoint_get_students_ + this.cursoId).subscribe(
      res => {
        this.estudiantes = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  openDetails(p: any) {
    console.log(p);
    this.cursoId = p.id;
    this.cursoName = p.description + ' | ' + p.parallel + ' | ' + p.cycle;
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
    this.estudiantes = [];
  }
}
