import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewpasswordComponent } from './newpassword.component';
import { NewpasswordRoutingModule } from './newpassword-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewpasswordRoutingModule,
    SharedModule
  ],
  declarations: [
    NewpasswordComponent
  ]
})
export class NewpasswordModule { }
