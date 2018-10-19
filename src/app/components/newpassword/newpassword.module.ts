import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewpasswordComponent } from './newpassword.component';
import { NewpasswordRoutingModule } from './newpassword-routing.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewpasswordRoutingModule,
    SharedModule
  ],
  declarations: [
    NewpasswordComponent
  ]
})
export class NewpasswordModule { }
