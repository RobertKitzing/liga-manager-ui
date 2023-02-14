import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith, switchMap } from 'rxjs';
import { Maybe, Team, UpdateUserGQL, User, UserRole } from 'src/api/graphql';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'lima-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  UserRole = UserRole;
  
  searchTeam = new FormControl();

  allTeams$ = this.searchTeam.valueChanges.pipe(
    startWith(null),
    switchMap(
      (searchTerm) => !searchTerm ? this.teamService.allTeams$ : this.teamService.allTeams$.pipe(map((t) => t.filter(x => x?.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))))
    ) 
  )

  userFormGroup = new FormGroup({
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    role: new FormControl<UserRole | undefined>(undefined),
    team_ids: new FormControl<string[]>([]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private teamService: TeamService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    if(this.user) {
      this.userFormGroup.patchValue({
        ...this.user,
        team_ids: this.user.teams?.map(t => t?.id!)
      });
    
    }
  }

  async onSaveClicked() {
    const t = {
      ...this.userFormGroup.value,
    }
  
    if(this.user) {
      // await this.userService.updateUser(t)
    } else {

    }
  }

}
