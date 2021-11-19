import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Penalty, SeasonPenalties, AddRankingPenaltyGQL, SeasonPenaltiesGQL, RankingGQL } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import * as uuidv4 from 'uuid/v4';

interface EditRankingPenaltyComponentData {
  season: SeasonPenalties.Season;
  penalty: Penalty.Fragment;
}
@Component({
  selector: 'app-edit-ranking-penalty',
  templateUrl: './edit-ranking-penalty.component.html',
  styleUrls: ['./edit-ranking-penalty.component.css']
})
export class EditRankingPenaltyComponent implements OnInit {

  @ViewChild('teamSelect') teamSelect: MatSelect;

  selectedTeamId: string;

  penaltyPoints: number;
  penaltyReason: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditRankingPenaltyComponentData,
    private addPenaltyGQL: AddRankingPenaltyGQL,
    private dialogRef: MatDialogRef<EditRankingPenaltyComponent>,
    private notify: NotificationService,
    private seasonPenaltiesGQL: SeasonPenaltiesGQL,
    private translateService: TranslateService,
    private rankingGQL: RankingGQL
  ) { }

  ngOnInit() {
    if (this.data.penalty) {
      this.selectedTeamId = this.data.penalty.team.id;
      this.penaltyPoints = this.data.penalty.points;
      this.penaltyReason = this.data.penalty.reason;
      this.teamSelect.setDisabledState(true);
    }
  }

  async savePenalty() {
    try {
      await this.addPenaltyGQL.mutate({
        id: this.data.penalty ? this.data.penalty.id : uuidv4(),
        season_id: this.data.season.id,
        team_id: this.selectedTeamId,
        points: this.penaltyPoints,
        reason: this.penaltyReason
      }, {
          refetchQueries: [
            {
              query: this.seasonPenaltiesGQL.document,
              variables: { id: this.data.season.id }
            },
            {
              query: this.rankingGQL.document,
              variables: { id: this.data.season.id }
            }
          ]
        }).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('PENALTY_SAVED'));
      this.dialogRef.close(true);
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('PENALTY_ERROR'), error);
    }
  }
}
