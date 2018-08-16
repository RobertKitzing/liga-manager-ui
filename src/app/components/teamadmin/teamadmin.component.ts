import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamService } from '../../services/team.service';
import { FormControl, Validators } from '@angular/forms';
import { Contact_person, Client } from '../../../api';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-teamadmin',
  templateUrl: './teamadmin.component.html',
  styleUrls: ['./teamadmin.component.css']
})
export class TeamadminComponent implements OnInit {

  emailFormControl: FormControl = new FormControl('', [ Validators.email, Validators.required ]);

  constructor(
    public authService: AuthenticationService,
    public teamService: TeamService,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    private apiClient: Client) { }

  ngOnInit() {
    // TODO: load User Teams from api.
  }

  saveContact(teamId: string, firstname: string, lastname: string, mail: string, phone: string) {
    if (this.isEmailValidOrEmpty(mail)) {
      const body = new Contact_person();
      body.email = mail;
      body.first_name = firstname;
      body.last_name = lastname;
      body.phone = phone;
      this.apiClient.updateTeamContact(teamId, body).subscribe(
        () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: this.translateService.instant('TEAM_CONTACT_SAVE_SUCCESS')
            },
            panelClass: ['alert', 'alert-success']
          });
        }
      );
    }
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
