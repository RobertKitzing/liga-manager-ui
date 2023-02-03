import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonChooserComponent } from './season-chooser.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [
  SeasonChooserComponent
]

@NgModule({
  declarations,
  imports: [
    CommonModule,
    MatSelectModule,
    TranslateModule,
  ],
  exports: declarations
})
export class SeasonChooserModule { }
