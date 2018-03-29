import { AddMatchComponent } from './tournament.addmatch.dialog';
import { FormsModule } from '@angular/forms';
import { TournamentComponent } from '@app/tournament/tournament.component';
import { TournamentRoutingModule } from './tournament-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatRippleModule } from '@angular/material';
import { MaterialModule } from '@app/material.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    TournamentRoutingModule,
    TranslateModule,
  ],
  entryComponents: [
    AddMatchComponent
  ],
  declarations: [
    TournamentComponent,
    AddMatchComponent
  ],
  exports: [
    AddMatchComponent
  ]
})
export class TournamentModule { }
