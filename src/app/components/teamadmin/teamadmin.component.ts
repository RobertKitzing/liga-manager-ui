import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamService } from '../../services/team.service';
import { FormControl, Validators } from '@angular/forms';
import { Contact_person, Client } from '../../../api';

@Component({
  selector: 'app-teamadmin',
  templateUrl: './teamadmin.component.html',
  styleUrls: ['./teamadmin.component.css']
})
export class TeamadminComponent implements OnInit {

  emailFormControl: FormControl = new FormControl('', Validators.email);

  constructor(
    public authService: AuthenticationService,
    public teamService: TeamService,
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
          alert('saved');
          this.teamService.updateTeam(teamId);
        }
      );
    }
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
