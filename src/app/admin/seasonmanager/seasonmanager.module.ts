import { IsAdminGuard } from '@app/core/authentication/isadmin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MatTableModule, MatStepperModule, MatDividerModule } from '@angular/material';
import { SeasonManagerComponent } from '@app/admin/seasonmanager/seasonmanager.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
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
  ],
  exports: [
    SeasonManagerComponent
  ]
})
export class SeasonManagerModule { }
