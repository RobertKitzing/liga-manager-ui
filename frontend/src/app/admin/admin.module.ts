import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ManageTournamentsComponent } from './manage-tournaments/manage-tournaments.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { ManagePitchesComponent } from './manage-pitches/manage-pitches.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditUserDialogComponent } from './manage-users/edit-user-dialog/edit-user-dialog.component';
import { EnumTranslateModule } from '../pipes/enum-translate/enum-translate.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AdminComponent,
    ManageTournamentsComponent,
    ManageUsersComponent,
    ManageTeamsComponent,
    ManagePitchesComponent,
    EditUserDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    TranslateModule.forChild(),
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    EnumTranslateModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ]
})
export class AdminModule { }
