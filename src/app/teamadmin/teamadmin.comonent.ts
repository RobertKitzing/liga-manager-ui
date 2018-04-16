import { Component, OnInit } from '@angular/core';
import { TeamService } from '@app/service/team.service';
import { AuthenticationService } from '@app/service/authentication.service';
import { User } from '@app/api/openapi';
import { FormControl, Validators } from '@angular/forms';
import { Logger } from '@app/core/logger.service';

const log = new Logger('TeamAdminComponent');
@Component({
  selector: 'app-teamadmin',
  templateUrl: './teamadmin.component.html',
  styleUrls: ['./teamadmin.component.scss']
})
export class TeamAdminComponent implements OnInit {

  user: User;
  emailFormControl: FormControl = new FormControl('', Validators.email);

  constructor(
    public teamService: TeamService,
    private autchService: AuthenticationService
  ) { }

  async ngOnInit() {
    this.user = await this.autchService.loadUser();
  }

  saveContact(teamId: string, firstname: string, lastname: string, mail: string, phone: string) {
    log.debug('mail', this.isEmailValidOrEmpty(mail));
    log.debug(teamId, firstname, lastname, mail, phone);
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
