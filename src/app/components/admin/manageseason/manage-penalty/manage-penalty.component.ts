import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SeasonPenaltiesGQL, SeasonPenalties, Penalty, RemoveRankingPenaltyGQL, RankingGQL } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditRankingPenaltyComponent } from './edit-ranking-penalty/edit-ranking-penalty.component';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-penalty',
  templateUrl: './manage-penalty.component.html',
  styleUrls: ['./manage-penalty.component.css']
})
export class ManagePenaltyComponent implements OnInit, OnChanges {

  @Input() manageSeasonId: string;

  penalties: Observable<SeasonPenalties.Season>;

  constructor(
    private rankingGQL: RankingGQL,
    private seasonPenaltiesGQL: SeasonPenaltiesGQL,
    private removePenaltiesGQL: RemoveRankingPenaltyGQL,
    public i18Service: I18Service,
    private dialog: MatDialog,
    private notify: NotificationService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadPenalties();
  }

  ngOnChanges() {
    this.loadPenalties();
  }

  loadPenalties() {
    this.penalties = this.seasonPenaltiesGQL.watch({ id: this.manageSeasonId }).valueChanges.pipe(
      map(({ data }) => data.season)
    );
  }

  openEditDialog(season: SeasonPenalties.Season, penalty?: Penalty.Fragment) {
    const dialogRef = this.dialog.open(EditRankingPenaltyComponent, {
      data: {
        season: season,
        penalty: penalty
      }
    });
  }

  async removePenalty(penalty: Penalty.Fragment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translateService.instant('CONFIRM_DELETE_PENALTY')
      }
    });

    dialogRef.afterClosed().subscribe(
      async (confirm) => {
        if (confirm) {
          try {
            await this.removePenaltiesGQL.mutate({
              ranking_penalty_id: penalty.id,
              season_id: this.manageSeasonId
            }, {
                refetchQueries: [
                  {
                    query: this.seasonPenaltiesGQL.document,
                    variables: { id: this.manageSeasonId }
                  },
                  {
                    query: this.rankingGQL.document,
                    variables: { id: this.manageSeasonId }
                  }
                ]
              }).toPromise();
            this.notify.showSuccessNotification(this.translateService.instant('REMOVE_PENALTY_SUCCESS'));
          } catch (error) {
            this.notify.showErrorNotification(this.translateService.instant('REMOVE_PENALTY_ERROR'), error);
          }
        }
      });
  }
}
