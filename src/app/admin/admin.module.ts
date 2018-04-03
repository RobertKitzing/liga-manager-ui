import { SeasonManagerModule } from './seasonmanager/seasonmanager.module';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from '@app/admin/admin-routing.module';

@NgModule({
    imports: [
        SeasonManagerModule,
        AdminRoutingModule
    ],
    exports: [],
    declarations: [
        AdminComponent
    ],
    providers: [],
})
export class AdminModule { }
