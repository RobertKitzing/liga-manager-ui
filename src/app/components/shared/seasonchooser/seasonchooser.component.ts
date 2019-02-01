import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material';
import { AllSeasonsList } from 'src/api/graphql';
@Component({
  selector: 'app-seasonchooser',
  templateUrl: './seasonchooser.component.html',
  styleUrls: ['./seasonchooser.component.css']
})
export class SeasonchooserComponent implements OnInit {

  season: AllSeasonsList.AllSeasons;
  @Output() seasonChanged: EventEmitter<AllSeasonsList.AllSeasons> = new EventEmitter<AllSeasonsList.AllSeasons>();

  constructor(public seasonService: SeasonService) { }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      (season) => {
        this.season = season;
      }
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeason.next(event.value);
    this.seasonChanged.emit(event.value);
  }

}
