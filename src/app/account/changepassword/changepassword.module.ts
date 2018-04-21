import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { ChangePasswordComponent } from './changepassword.component';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        SharedModule,
        AlertModule,
        MaterialModule
    ],
    entryComponents: [
        ChangePasswordComponent
    ],
    declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
