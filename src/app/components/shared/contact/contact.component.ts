import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team, Client } from '../../../../api';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public teams: Team[] = new Array<Team>();

  constructor(
    public dialogRef: MatDialogRef<ContactComponent>,
    private apiClient: Client,
    @Inject(MAT_DIALOG_DATA) public teamIds: string[]) { }

  ngOnInit() {
    this.teamIds.forEach(
      (teamId) => {
        this.apiClient.getTeam(teamId).subscribe(
          (team) => {
            this.teams.push(team);
          }
        );
      });
  }

}
