import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Tournament } from '@api/graphql';
import { TournamentService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'lima-tournament-chooser',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        MatSelectModule,
        TranslateModule,
    ],
    templateUrl: './tournament-chooser.component.html',
})
export class TournamentChooserComponent {

  @Input({ required: true })
  selectedTournamentFC!: FormControl<Tournament | null>;

  constructor(
    public tournamentService: TournamentService,
  ) {

  }

}
