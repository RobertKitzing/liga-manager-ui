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

  @Input() filterState = SeasonState.Progress;
  season: AllSeasonsList.AllSeasons;
  seasonList: Observable<AllSeasonsList.AllSeasons[]>;
  @Output() seasonChanged: EventEmitter<AllSeasonsList.AllSeasons> = new EventEmitter<AllSeasonsList.AllSeasons>();

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
        ({ data }) => data.allSeasons.filter(s => s.state === this.filterState)
      )
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeason.next(event.value);
    this.seasonChanged.emit(event.value);
  }

}
