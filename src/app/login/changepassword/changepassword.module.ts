import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { ChangePasswordComponent } from './changepassword.component';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule
    ],
    entryComponents: [
        ChangePasswordComponent
    ],
    declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
