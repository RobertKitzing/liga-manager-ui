import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';

const declarations = [
  CustomDatePipe
]

@NgModule({
  declarations,
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe
  ],
  exports: declarations
})
export class CustomDateModule { }
