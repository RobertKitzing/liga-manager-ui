import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumTranslatePipe } from './enum-translate.pipe';
import { TranslatePipe } from '@ngx-translate/core';

const declarations = [
  EnumTranslatePipe
]

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  providers: [
    TranslatePipe,
  ],
  exports: declarations
})
export class EnumTranslateModule { }
