import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'lima-team-contact',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './team-contact.component.html',
})
export class TeamContactComponent {

  team$ = this.activatedRoute.parent?.paramMap.pipe(
    map(
      (p) => p.get('teamId')!,
    ),
    switchMap(
      (teamId) => this.teamService.getTeamById(teamId).pipe(
            tap(
              (team) => {
                this.teamContact.patchValue({
                  email: team?.contact?.email || null,
                  first_name: team?.contact?.first_name,
                  last_name: team?.contact?.last_name,
                  phone: team?.contact?.phone,
                })
              },
            ),
          ),
    ),
  )

  teamContact = new FormGroup({
    email: new FormControl('', [Validators.email]),
    first_name: new FormControl(),
    last_name: new FormControl(),
    phone: new FormControl(),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
  ) {

  }

  // team$(id: string) {
  //   return this.teamService.getTeamById(id).pipe(
  //     // tap(
  //     //   (team) => {
  //     //     this.teamContact.setValue({
  //     //       email: team?.contact?.email || null,
  //     //       first_name: team?.contact?.first_name,
  //     //       last_name: team?.contact?.last_name,
  //     //       phone: team?.contact?.phone,
  //     //     })
  //     //   },
  //     // ),
  //   )
  // }

  async updateTeamContact(team_id: string) {
    await firstValueFrom(this.teamService.updateTeamContact({
      team_id,
      email: this.teamContact.value.email!,
      first_name: this.teamContact.value.first_name,
      last_name: this.teamContact.value.last_name,
      phone: this.teamContact.value.phone,
    }));
  }

}
