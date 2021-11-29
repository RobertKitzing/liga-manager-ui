import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { SeasonFragment } from 'src/api/graphql';
import { I18Service } from 'src/app/services/i18.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-manage-matches',
  templateUrl: './manage-matches.component.html',
  styleUrls: ['./manage-matches.component.css']
})
export class ManageMatchesComponent implements OnInit {

  manageSeason: Observable<SeasonFragment> = this.seasonService.manageSeason.pipe(
    switchMap(
      (manageSeason) => this.seasonService.getSeason({id: manageSeason.id}),
    ),
  );
  
  constructor(
    public i18Service: I18Service,
    private seasonService: SeasonService,
  ) { }

  ngOnInit(): void {
  }

}
