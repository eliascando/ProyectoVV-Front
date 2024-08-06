import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { PrimeIcons } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastModule,
        ConfirmDialogModule,
        ButtonModule,
        DialogModule,
        MessageModule,
        SidebarModule,
        TableModule,
        FileUploadModule,
        DynamicDialogModule, 
        ToastModule, 
        ButtonModule,
        DropdownModule
    ],
    exports: [
        ToastModule, 
        FileUploadModule, 
        ConfirmDialogModule, 
        ButtonModule, 
        DialogModule, 
        MessageModule,
        SidebarModule,
        TableModule,
        FileUploadModule,
        DynamicDialogModule, 
        ToastModule, 
        ButtonModule,
        DropdownModule
    ],
})
export class PrimengModule { }