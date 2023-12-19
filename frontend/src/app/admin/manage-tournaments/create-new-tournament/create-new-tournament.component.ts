import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CreateTournamentGQL } from '@api/graphql';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { NotificationService, TournamentService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lima-create-new-tournament',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './create-new-tournament.component.html',
})
export class CreateNewTournamentComponent {

  newName = new FormControl('', [Validators.required]);

  constructor(
    private tournamentService: TournamentService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {

  }

  async createTournament() {
    try {
      await firstValueFrom(this.tournamentService.createTournament(this.newName.value!))
      this.notificationService.showSuccessNotification(
        marker('CREATE_TOURNAMENT_SUCCESS'),
      )
      this.dialog.closeAll();
    } catch(error) {
      this.notificationService.showErrorNotification(
        marker('CREATE_TOURNAMENT_ERROR'),
      )
    }
    
  }

}