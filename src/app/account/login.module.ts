import { TranslateModule } from '@ngx-translate/core';
import { RoundPipe } from './../shared/pipes/round.pipe';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule
    ],
    exports: [],
    entryComponents: [LoginComponent],
    declarations: [
        LoginComponent
    ],
    providers: [],
})
export class LoginModule { }
