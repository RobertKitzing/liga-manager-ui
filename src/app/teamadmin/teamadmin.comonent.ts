import { Component, OnInit } from '@angular/core';
import { TeamService } from '@app/service/team.service';
import { AuthenticationService } from '@app/service/authentication.service';
import { User, Client, Contact_person } from '@app/api/openapi';
import { FormControl, Validators } from '@angular/forms';
import { Logger } from '@app/service/logger.service';

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
    private autchService: AuthenticationService,
    private api: Client
  ) { }

  async ngOnInit() {
    this.user = await this.autchService.loadUser();
  }

  saveContact(teamId: string, firstname: string, lastname: string, mail: string, phone: string) { 
    log.debug(teamId, firstname, lastname, mail, phone);
    if (this.isEmailValidOrEmpty(mail)) {
      const body = new Contact_person();
      body.email = mail;
      body.first_name = firstname;
      body.last_name = lastname;
      body.phone = phone;
      this.api.updateTeamContact(teamId, body).subscribe(
        () => {
          alert('saved');
        }
      );
    }
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
