import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { MatchService } from '../../services/match.service';
import { MatchViewModel } from '../../models/match.viewmodel';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public matches: MatchViewModel[];

  constructor(
    private seasonService: SeasonService,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      async (season) => {
        this.matches = await this.matchService.getMatchesInSeason(season.id, 1);
        console.log(this.matches);
      }
    );
  }

}
