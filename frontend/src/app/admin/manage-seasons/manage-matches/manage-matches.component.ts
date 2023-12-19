import { Component } from '@angular/core';
import { ManageSeasonBase } from '../manage-season.base';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lima-manage-matches',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './manage-matches.component.html',
})
export class ManageMatchesComponent extends ManageSeasonBase {

}
