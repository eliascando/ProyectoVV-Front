import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-crud-dialog',
  standalone: true,
  imports: [
    PrimengModule, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <p-dialog 
      [header]="header"
      [(visible)]="visible" 
      [style]="{width: width}"
      [modal]="true" 
      [closable]="false" 
      [breakpoints]="{'960px': '75vw', '640px': '90vw'}"
      (onShow)="handleOnShow()"
    >
      <ng-template pTemplate="content">
          <ng-content></ng-content>
      </ng-template>

      <p-footer>
        <button 
          *ngIf="showCancellButton"
          pButton 
          type="button" 
          label={{cancelLabel}} 
          icon="pi pi-times" 
          (click)="onCancel()"
          [style]="{'background-color': '#dc3545', 'color': 'white'}"
        ></button>
        <button 
          pButton 
          type="button" 
          label={{confirmLabel}} 
          icon="pi pi-check" 
          (click)="onSave()"
          [disabled]="disableConfirm"
          [style]="{'background-color': '#28a745', 'color': 'white', 'margin-left': '10px'}"
        ></button>
      </p-footer>
    </p-dialog>
  `
})

export class BaseCrudDialogComponent {
  @Input() visible: boolean = false;
  @Input() width: string = '450px';
  @Input() header: string = '';
  @Input() confirmLabel: string = 'Guardar';
  @Input() cancelLabel: string = 'Cancelar';
  @Input() showCancellButton: boolean = true;
  @Input() disableConfirm: boolean = false;
  @Input() onShowCallback?: () => void;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  handleOnShow() {
    if (this.onShowCallback) {
      this.onShowCallback();
    }
  }

  onSave() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
