import { IsAdminGuard } from './../core/authentication/isadmin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MatTableModule, MatStepperModule, MatDividerModule } from '@angular/material';
import { SeasonManagerComponent } from '@app/seasonmanager/seasonmanager.component';
import { SeasonManagerRoutingModule } from '@app/seasonmanager/seasonmanager-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SeasonManagerRoutingModule,
    SharedModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDividerModule,
    MaterialModule
  ],
  declarations: [
    SeasonManagerComponent
  ],
  providers: [
    IsAdminGuard
  ]
})
export class SeasonManagerModule { }
