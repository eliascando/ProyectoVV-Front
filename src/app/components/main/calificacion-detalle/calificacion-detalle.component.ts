import { Component, Input, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISystemParameter } from '../../../interfaces/ISystemParameter';
import { ISystemParameterDetails } from '../../../interfaces/ISystemParameterDetails';
import { Global } from '../../../global';
import { BaseCrudComponent } from '../base-crud/base-crud.component';
import { CommonModule, Location } from '@angular/common';
import { BaseCrudDialogComponent } from '../base-crud/base-crud-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificacion-detalle',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, ReactiveFormsModule, CommonModule, BaseCrudDialogComponent],
  providers: [ApiService, AuthService],
  templateUrl: './calificacion-detalle.component.html',
  styleUrl: './calificacion-detalle.component.css'
})


export class CalificacionDetalleComponent extends BaseCrudComponent implements OnInit{
  
  id_curso: number;
  id_estudiante: number;
  id_matricula: number;
  user: any;
  curso: any;
  calificaciones: any[];
  endpoint_save_calificacion : string;
  endpoint_get_calificaciones : string;
  endpoint_procesar_calificaciones : string;
  endpoint_get_curso_detail: string;
  endpoint_get_dropdowns: string;
  cursoDescription: string;
  showCalificaciones: boolean = false;
  showCalificacionesButton: boolean = true;
  showAddCalificacion: boolean = false;
  showFinalProcessButton: boolean = false;
  showAddButton: boolean = true;

  showPaginator: boolean = true;
  tipoCalificacion: ISystemParameterDetails[];
  periodoCalificacion: ISystemParameterDetails[];
  formCalificacion: FormGroup;

  constructor(
    private api: ApiService,
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) { 
    super(api, form);
    this.user = this.auth.getUser();
    this.items = [];
    this.endpoint_save_calificacion = Global.API_SAVE_CALIFICACION;
    this.endpoint_procesar_calificaciones = Global.API_PROCESAR_CALIFICACION_BY_MATRICULA;

    this.formCalificacion = this.form.group({
      calificacion: ['', Validators.required],
      tipoCalificacion: ['', Validators.required],
      periodoCalificacion: ['', Validators.required]
    });    
  }

  override ngOnInit(): void {
    this.id_curso = Number(this.route.snapshot.paramMap.get('id'));
    this.endpoint_get = Global.API_GET_ESTUDIANTE_BY_CURSO_ID + this.id_curso;
    this.endpoint_get_curso_detail = Global.API_GET_CURSO_BY_ID + this.id_curso;
    this.loadEntities();
    this.getCursoDetail();
  }

  back(): void {
    this.router.navigate(['/home/calificaciones']);
  }

  getCursoDetail(): void {
    this.api.get(this.endpoint_get_curso_detail).subscribe(
      (res: any) => {
        this.curso = res.data;
        this.cursoDescription = this.curso.description + ' - ' + this.curso.parallel + ' - ' + this.curso.cycle;
      }
    );
  }

  loadDropDowns(): void {
    let url = Global.API_GET_CALIFICACION_DROPDOWNS_BY_STUDENT_AND_COURSE;
    url = url.replace('{idCourse}', this.id_curso.toString());
    url = url.replace('{idStudent}', this.id_estudiante.toString());
    this.api.get(url).subscribe(
      res => {
        console.log(res);
        let tipos = res.data.filter((item: any) => item.id == 5);
        let periodos = res.data.filter((item: any) => item.id == 6);
        this.tipoCalificacion = tipos[0].details;
        this.periodoCalificacion = periodos[0].details;
      },
      err => {
        console.log(err);
      }
    );
  }

  openCalificaciones(e :any): void {
    this.id_estudiante = e.id;
    this.id_matricula = e.matriculaId;
    this.showPaginator = false;
    this.showCalificaciones = true;
    this.showCalificacionesButton = false;
    this.items = this.items.filter((item) => item.id == e.id);
    this.validarProcesarCalificaciones();
    this.getCalificaciones(e.id);
    this.loadDropDowns();
  }

  validarProcesarCalificaciones(): void {
    let url = Global.API_VALIDAR_PROCESAR_CALIFICACION
              .replace(
                '{idMatricula}', 
                this.id_matricula.toString()
              );

    this.api.get(url).subscribe(
      res => {
        console.log(res);
        if(res.data == 3) {
          this.showAddButton = false;

        } else if (res.data == 2) {
          this.showFinalProcessButton = false;
          // Swal.fire({
          //   title: 'Calificaciones ya procesadas',
          //   text: 'Las calificaciones ya han sido procesadas',
          //   icon: 'warning',
          //   confirmButtonText: 'Aceptar'
          // });
        } else if (res.data == 1) {
          this.showFinalProcessButton = true;
          // Swal.fire({
          //   title: 'Calificaciones ya procesadas',
          //   text: 'Las calificaciones ya han sido procesadas',
          //   icon: 'warning',
          //   confirmButtonText: 'Aceptar'
          // });
        }
        // this.showFinalProcessButton = true;

        // } else {
        //   Swal.fire({
        //     title: 'Calificaciones ya procesadas',
        //     text: 'Las calificaciones ya han sido procesadas',
        //     icon: 'warning',
        //     confirmButtonText: 'Aceptar'
        //   });
        // }
      },
      err => {
        console.log(err);
      }
    );
  }

  getCalificaciones(id: number): void {
    let url = Global.API_GET_CALIFICACIONES_BY_CURSO_ESTUDIANTE;
    url = url.replace('{idUser}', id.toString());
    url = url.replace('{idCurso}', this.id_curso.toString());
    this.endpoint_get_calificaciones = url;
    this.api.get(this.endpoint_get_calificaciones).subscribe(
      (res: any) => {
        this.calificaciones = res.data;
      }
    );
  }

  closeCalificaciones(): void {
    this.showPaginator = true;
    this.showCalificacionesButton = true;
    this.showCalificaciones = false;
    this.showFinalProcessButton = false;
    this.periodoCalificacion = [];
    this.tipoCalificacion = [];
    this.loadEntities();
  }

  saveCalificacion(): void {
    // console.log(this.formCalificacion.value);

    let data = {
      idUsuario: this.id_estudiante,
      idCurso: this.id_curso,
      calificacion: this.formCalificacion.value.calificacion,
      periodoCalificacion: this.formCalificacion.value.periodoCalificacion,
      tipoCalificacion: this.formCalificacion.value.tipoCalificacion
    }
    console.log(data);

    this.api.post(this.endpoint_save_calificacion, data).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          title: 'Calificación guardada',
          text: 'La calificación ha sido guardada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.validarProcesarCalificaciones();
        this.getCalificaciones(this.id_estudiante);
        this.loadDropDowns();
        this.closeAddCalificacion();
      },
      err => {
        console.log(err);
      }
    );    
  }

  procesarCalificaciones(): void {
    let url = Global.API_PROCESAR_CALIFICACION_BY_MATRICULA
              .replace(
                '{idMatricula}', 
                this.id_matricula.toString()
              );

    this.api.post(url).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          title: 'Calificaciones procesadas',
          text: 'Las calificaciones han sido procesadas con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.closeCalificaciones();
      },
      err => {
        console.log(err);
      }
    );
  }


  getEstado(nota: number): string {
    if(nota >= 7) {
      return 'Aprobado';
    } else {
      return 'Reprobado';
    }
  }

  openAddCalificacion(): void {
    this.showAddCalificacion = true
  }

  closeAddCalificacion(): void {
    this.showAddCalificacion = false;
  }
}
