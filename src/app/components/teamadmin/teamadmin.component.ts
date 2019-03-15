import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamService } from '../../services/team.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { UpdateTeamContactGQL, UserGQL } from 'src/api/graphql';

@Component({
  selector: 'app-teamadmin',
  templateUrl: './teamadmin.component.html',
  styleUrls: ['./teamadmin.component.css']
})
export class TeamadminComponent implements OnInit {

  emailFormControl: FormControl = new FormControl('', [Validators.email, Validators.required]);
  user = this.authService.user;

  constructor(
    private authService: AuthenticationService,
    public teamService: TeamService,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    private updateTeamContact: UpdateTeamContactGQL,
    private userQGL: UserGQL
  ) { }

  ngOnInit() {
  }

  async saveContact(teamId: string, firstname: string, lastname: string, email: string, phone: string) {
    try {
      await this.updateTeamContact.mutate(
        {
          team_id: teamId,
          email: email,
          first_name: firstname,
          last_name: lastname,
          phone: phone
        },
        {
          refetchQueries: [
            { query: this.userQGL.document }
          ]
        }
      ).toPromise();
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('TEAM_CONTACT_SAVE_SUCCESS')
        },
        panelClass: ['alert', 'alert-success']
      });
    } catch (error) {
      console.error(error);
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('TEAM_CONTACT_SAVE_ERROR')
        },
        panelClass: ['alert', 'alert-danger']
      });
    }
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
