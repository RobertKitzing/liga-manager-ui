import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Season } from '../../../../api';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-seasonchooser',
  templateUrl: './seasonchooser.component.html',
  styleUrls: ['./seasonchooser.component.css']
})
export class SeasonchooserComponent implements OnInit {

  season: Season;
  @Output() seasonChanged: EventEmitter<Season> = new EventEmitter<Season>();

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
