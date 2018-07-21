import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { MaterialModule } from '../../material.module';
import { ContactComponent } from './contact/contact.component';
import { EditmatchComponent } from './editmatch/editmatch.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [
    ContactComponent,
    EditmatchComponent
  ],
  declarations: [
    MatchComponent,
    ContactComponent,
    EditmatchComponent
  ],
  exports: [
    MatchComponent,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule { }