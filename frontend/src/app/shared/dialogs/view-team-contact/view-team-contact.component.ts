import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Team } from '@api/graphql';
import { TeamContactComponent } from '@lima/shared/components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lima-view-team-contact',
  standalone: true,
  imports: [
    TeamContactComponent,
    MatDialogModule,
    TranslateModule,
  ],
  templateUrl: './view-team-contact.component.html',
})
export class ViewTeamContactComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Team,
    // private dialogRef: MatDialogRef<ViewTeamContactComponent>,
  ) { }

}
