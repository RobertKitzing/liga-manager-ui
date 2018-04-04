import { MaterialModule } from './../material.module';
import { SharedModule } from '@app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SeasonManagerModule } from './seasonmanager/seasonmanager.module';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from '@app/admin/admin-routing.module';
import { MatTabsModule, MatFormFieldModule } from '@angular/material';

@NgModule({
    imports: [
        SharedModule,
        SeasonManagerModule,
        AdminRoutingModule,
        MatTabsModule,
        TranslateModule,
        MaterialModule
    ],
    exports: [],
    declarations: [
        AdminComponent
    ],
    providers: [],
})
export class AdminModule { }
