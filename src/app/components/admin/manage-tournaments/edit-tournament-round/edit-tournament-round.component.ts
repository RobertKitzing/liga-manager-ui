import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TeamService } from '../../../../services/team.service';
import { TranslateService } from '@ngx-translate/core';
import { TeamFragment } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface AddMatchData {
  round: number;
  tournamentId: string;
  teams: RoundTeam[];
  dates: { from: Date, to: Date };
}
export interface RoundTeam {
  homeTeam: TeamFragment;
  guestTeam: TeamFragment;
}
@Component({
  selector: 'app-edit-tournament-round',
  templateUrl: 'edit-tournament-round.component.html'
})
export class EditTournamentRoundComponent implements OnInit {

  planDateTo: Date;
  planDateFrom: Date;

  teamPairFormGroup = new FormGroup({
    home: new FormControl(null, [Validators.required]),
    guest: new FormControl(null, [Validators.required]),
  });

  roundTeams: RoundTeam[] = new Array<RoundTeam>();
  
  constructor(
    public teamService: TeamService,
    private dialogRef: MatDialogRef<EditTournamentRoundComponent>,
    private translateService: TranslateService,
    private notify: NotificationService,
    private tournamentService: TournamentService,
    @Inject(MAT_DIALOG_DATA) public data: AddMatchData
  ) {
    if (data.teams) {
      this.roundTeams = data.teams;
    }
    if (data.dates) {
      this.planDateFrom = data.dates.from;
      this.planDateTo = data.dates.to;
    }
  }

  ngOnInit() {
    this.teamPairFormGroup.valueChanges.subscribe(
      (form) => {
        this.addTeam(form.home, form.guest);
      }
    );
  }

  addTeam(homeTeam: TeamFragment, guestTeam: TeamFragment) {
    if (homeTeam && guestTeam && homeTeam !== guestTeam) {
      this.roundTeams.push({
        homeTeam,
        guestTeam,
      });
      this.teamPairFormGroup.reset();
    }
  }

  removeTeam(index: number) {
    this.roundTeams.splice(index, 1);
  }

  async createRound() {
    try {
      await this.tournamentService.createRound({
        tournament_id: this.data.tournamentId,
        date_period: {
            from: new Date(this.planDateFrom).toDateString(),
            to: new Date(this.planDateTo).toDateString()
        },
        round: this.data.round,
        team_id_pairs: this.roundTeams.map((t) => ({ home_team_id: t.homeTeam.id, guest_team_id: t.guestTeam.id }))
      })
      this.notify.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_ROUND_SUCCESS'));
      this.dialogRef.close(true);
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('CREATE_TOURNAMENT__ROUND_ERROR'), error);
    }
  }

  isRoundValid(): boolean {
    return this.planDateFrom && this.planDateTo && this.roundTeams.length > 0 && this.planDateFrom < this.planDateTo;
  }
}
