import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamService } from '../../services/team.service';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UpdateTeamContactGQL, UserGQL } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';

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
    public notify: NotificationService,
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
      this.notify.showSuccessNotification(this.translateService.instant('TEAM_CONTACT_SAVE_SUCCESS'));
    } catch (error) {
      this.notify.showSuccessNotification(this.translateService.instant('TEAM_CONTACT_SAVE_ERROR'), error);
    }
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
