import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { AddRankingPenaltyGQL, SeasonPenaltiesGQL, RankingGQL, PenaltyFragment, Season, SeasonFragment } from 'src/api/graphql';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SeasonService } from 'src/app/services/season.service';

export interface EditRankingPenaltyComponentData {
  season: any;
  penalty: PenaltyFragment;
}
@Component({
  selector: 'app-edit-ranking-penalty',
  templateUrl: './edit-ranking-penalty.component.html',
  styleUrls: ['./edit-ranking-penalty.component.css']
})
export class EditRankingPenaltyComponent implements OnInit {

  @ViewChild('teamSelect') teamSelect: MatSelect;

  penalty = new FormGroup(
    {
      team_id: new FormControl(null, [Validators.required]),
      points: new FormControl(null, [Validators.required]),
      reason: new FormControl(null, [Validators.required]),
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditRankingPenaltyComponentData,
    private seasonService: SeasonService,
    private dialogRef: MatDialogRef<EditRankingPenaltyComponent>,
    private notify: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  async savePenalty() {
    try {
      await this.seasonService.addPenalty({
        season_id: this.data.season.id,
        id: this.data.penalty?.id || uuidv4(),
        ...this.penalty.value,
      });
      this.notify.showSuccessNotification(this.translateService.instant('PENALTY_SAVED'));
      this.dialogRef.close(true);
    } catch (error) {
      this.notify.showErrorNotification(this.translateService.instant('PENALTY_ERROR'), error);
    }
  }
}
