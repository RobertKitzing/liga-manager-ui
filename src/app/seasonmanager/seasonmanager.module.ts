import { SharedModule } from '@app/shared';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MatTableModule } from '@angular/material';
import { SeasonManagerComponent } from '@app/seasonmanager/seasonmanager.component';
import { SeasonManagerRoutingModule } from '@app/seasonmanager/seasonmanager-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SeasonManagerRoutingModule,
    SharedModule
  ],
  declarations: [
    SeasonManagerComponent
  ]
})
export class SeasonManagerModule { }
