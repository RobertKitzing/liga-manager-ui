import { Component, Input, OnInit } from '@angular/core';
import { MatchPlan } from 'src/api/graphql';
import { I18Service } from 'src/app/services/i18.service';

@Component({
  selector: 'app-manage-matches',
  templateUrl: './manage-matches.component.html',
  styleUrls: ['./manage-matches.component.css']
})
export class ManageMatchesComponent implements OnInit {

  @Input() manageSeason: MatchPlan.Season;
  
  constructor(
    public i18Service: I18Service,
  ) { }

  ngOnInit(): void {
  }

}
