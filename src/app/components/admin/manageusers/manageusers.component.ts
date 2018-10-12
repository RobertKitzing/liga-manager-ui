import { Component, OnInit } from '@angular/core';
import { Team, CreateUserBodyRole, CreateUserBody, Client } from '../../../../api';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { TeamService } from '../../../services/team.service';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {

  teamList: Team[];
  userTeamList: string[] = new Array<string>();
  newUserName: string;
  newPassword: string;

  newVorname: string;
  newNachname: string;
  userRole: CreateUserBodyRole;

  CreateUserBodyRole = CreateUserBodyRole;

  // createUserForm: FormGroup;
  email: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;

  constructor(
    private apiClient: Client,
    private teamService: TeamService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar) {

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }

  async ngOnInit() {
    this.teamList = await this.teamService.loadTeams();
  }

  onChangeTeamSelect(event: MatSelectChange) {
    this.userTeamList = event.value;
  }

  createUser() {
    const body = new CreateUserBody();

    body.email = this.newUserName.toLowerCase();
    body.password = this.newPassword;
    body.teams = this.userTeamList;
    body.first_name = this.newVorname;
    body.last_name = this.newNachname;
    body.role = CreateUserBodyRole.Team_manager;
    this.apiClient.createUser(body).subscribe(
      (res) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('CREATE_USER_SUCCESS')
          },
          panelClass: ['alert', 'alert-success']
        });
      },
      (error) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('CREATE_USER_ERROR')
          },
          panelClass: ['alert', 'alert-danger']
        });
      }
    );
  }
}
