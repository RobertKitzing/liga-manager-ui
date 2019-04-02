import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material';
import { AllSeasonsList, SeasonState, AllSeasonsListGQL } from 'src/api/graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-seasonchooser',
  templateUrl: './seasonchooser.component.html',
  styleUrls: ['./seasonchooser.component.css']
})
export class SeasonchooserComponent implements OnInit {

  @Input() filterStates: Array<SeasonState> = [SeasonState.Progress, SeasonState.Ended];
  season: AllSeasonsList.AllSeasons;
  seasonList: Observable<AllSeasonsList.AllSeasons[]>;
  @Output() seasonChanged: EventEmitter<AllSeasonsList.AllSeasons> = new EventEmitter<AllSeasonsList.AllSeasons>();

  SeasonState = SeasonState;

  constructor(
    public seasonService: SeasonService,
    private allSeasonsListGQL: AllSeasonsListGQL
  ) { }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      (season) => {
        this.season = season;
      }
    );
    this.seasonList = this.allSeasonsListGQL.watch().valueChanges.pipe(
      map(
        ({ data }) => {
          let p = data.allSeasons.filter(s => this.filterStates.some(x => x === s.state));
          p = p.sort((a, b) => {

            const aState = a.state.toLocaleLowerCase();
            const bState = b.state.toLocaleLowerCase();
            if (aState > bState) {
              return -1;
            }
            if (aState < bState) {
              return 1;
            }
            const aName = a.name.toLocaleLowerCase();
            const bName = b.name.toLocaleLowerCase();
            if (aName > bName) {
              return 1;
            }
            if (aName < bName) {
              return -1;
            }
          });
          return p;
        }
      )
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeason.next(event.value);
    this.seasonChanged.emit(event.value);
  }

}
