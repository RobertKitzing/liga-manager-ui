import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamService } from '../../services/team.service';
import { UpdateTeamContactGQL, UserGQL, Contact } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teamadmin',
  templateUrl: './teamadmin.component.html',
  styleUrls: ['./teamadmin.component.css']
})
export class TeamadminComponent implements OnInit {

  user = this.authService.user;

  constructor(
    private userQGL: UserGQL,
    private authService: AuthenticationService,
    public teamService: TeamService,
    private updateTeamContact: UpdateTeamContactGQL,
    public notify: NotificationService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  async saveContact(teamId: string, contact: Contact.Fragment) {
    try {
      await this.updateTeamContact.mutate(
        {
          team_id: teamId,
          ...contact
        },
        {
          refetchQueries: [
            { query: this.userQGL.document }
          ]
        }
      ).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('TEAM_CONTACT_SAVE_SUCCESS'));
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('TEAM_CONTACT_SAVE_ERROR'), error);
    }
  }
}
