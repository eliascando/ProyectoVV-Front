import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { PrimengModule } from '../../../primeng.module';

@Component({
  selector: 'app-base-crud',
  standalone: true,
  imports: [PrimengModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './base-crud.component.html',
  styleUrl: './base-crud.component.css'
})
export class BaseCrudComponent implements OnInit{

  // Endpoints
  endpoint_save : string;
  endpoint_delete : string;
  endpoint_get : string;
  endpoint_update: string;

  id_edit: any;

  // Dialogs
  newDialog: boolean = false;
  editDialog: boolean = false;

  // Forms
  formNew: FormGroup;
  formEdit: FormGroup;
  
  // Items
  items: [];
  item: any;

  constructor(
    private apiServ: ApiService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loadEntities();
  }

  loadEntities() {
    this.apiServ.get(this.endpoint_get).subscribe(
      res => {
        this.items = res.data;
        console.log(this.items);
      },
      err => {
        console.log(err);
      }
    );
  }

  openNew() {
    this.newDialog = true;
  }

  editItem(item: any) {
    // set id to edit
    this.id_edit = item.id;
    // set values to form
    this.formEdit.patchValue(item);
    this.editDialog = true;
  }

  deleteItem(id: any) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar?',
      showCancelButton: true,
      confirmButtonText: `Sí`,
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiServ.delete(`${this.endpoint_delete}${id}`).subscribe(
          res => {
            Swal.fire('Eliminado', 'Elimnado correctamente!', 'success');
            this.ngOnInit();
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  saveNew() {
    if (this.formNew.invalid) {
      return;
    }

    this.apiServ.post(this.endpoint_save, this.formNew.value).subscribe(
      res => {
        if (!res.success) {
          this.newDialog = false;
          Swal.fire('Error', res.message, 'error');
          return;
        }
        this.newDialog = false;
        Swal.fire('Creado', 'Guardado exitosamente!', 'success');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  saveEdit() {
    // if (this.formEdit.invalid) {
    //   return;
    // }
    let url = `${this.endpoint_update}${this.id_edit}`;
    this.apiServ.put(url, this.formEdit.value).subscribe(
      res => {
        if (!res.success) {
          this.editDialog = false;
          Swal.fire('Error', res.message, 'error');
          return;
        }
        this.editDialog = false;
        Swal.fire('Actualizado', 'Actualizado correctamente', 'success');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  hideNewDialog() {
    this.newDialog = false;
    this.formNew.reset();
  }

  hideEditDialog() {
    this.editDialog = false;
    this.formEdit.reset();
  }
}
