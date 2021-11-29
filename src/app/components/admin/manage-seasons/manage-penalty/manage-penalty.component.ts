import { Component, OnInit, OnChanges } from '@angular/core';
import { PenaltyFragment, RankingPenalty } from 'src/api/graphql';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditRankingPenaltyComponent, EditRankingPenaltyComponentData } from './edit-ranking-penalty/edit-ranking-penalty.component';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-manage-penalty',
  templateUrl: './manage-penalty.component.html',
  styleUrls: ['./manage-penalty.component.css']
})
export class ManagePenaltyComponent implements OnInit, OnChanges {

  ranking = this.seasonService.manageSeason.pipe(
    switchMap(
      (manageSeason) => this.seasonService.getSeasonPenalties({id: manageSeason.id}),
    ),
  );

  constructor(
    public i18Service: I18Service,
    private seasonService: SeasonService,
    private dialog: MatDialog,
    private notify: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  openEditDialog(season, penalty?: RankingPenalty) {
    const dialogRef = this.dialog.open(EditRankingPenaltyComponent, {
      data: {
        season,
        penalty,
      } as EditRankingPenaltyComponentData
    });
  }

  async removePenalty(season, penalty: PenaltyFragment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translateService.instant('CONFIRM_DELETE_PENALTY')
      }
    });

    dialogRef.afterClosed().subscribe(
      async (confirm) => {
        if (confirm) {
          try {
            await this.seasonService.removePenalty({
              ranking_penalty_id: penalty.id,
              season_id: season.id,
            })            
            this.notify.showSuccessNotification(this.translateService.instant('REMOVE_PENALTY_SUCCESS'));
          } catch (error) {
            this.notify.showErrorNotification(this.translateService.instant('REMOVE_PENALTY_ERROR'), error);
          }
        }
      });
  }
}
