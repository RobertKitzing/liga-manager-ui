import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Pitch, PitchesGQL } from 'src/api/graphql';
import { map } from 'rxjs/operators';
import { PitchService } from 'src/app/services/pitch.service';
import { MatDialog } from '@angular/material';
import { EditPitchContactDialogComponent } from '../../shared/edit-pitch-contact-dialog/edit-pitch-contact-dialog.component';
import { CreatePitchDialogComponent } from '../../shared/create-pitch-dialog/create-pitch-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-managepitches',
  templateUrl: './managepitches.component.html',
  styleUrls: ['./managepitches.component.css']
})
export class ManagepitchesComponent implements OnInit {

  constructor(
    public pitchService: PitchService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private notify: NotificationService
  ) { }

  ngOnInit() {

  }

  async deletePitch(pitch: Pitch.Fragment) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.translateService.instant('CONFIRM_DELETE', { thing: pitch.label })
      }
    });
    dialogRef.afterClosed().subscribe(
      async (confirm) => {
        if (confirm) {
          try {
            await this.pitchService.deletePitch(pitch.id);
            this.notify.showSuccessNotification(this.translateService.instant('DELETE_PITCH_SUCESS'));
          } catch (error) {
            this.notify.showErrorNotification(this.translateService.instant('DELETE_PITCH_ERROR'), error);
          }
        }
      });
  }

  createNewPitch() {
    this.dialog.open(CreatePitchDialogComponent);
  }

  editPitchContact(pitch: Pitch.Fragment) {
    this.dialog.open(EditPitchContactDialogComponent,
      {
        data: pitch
      });
  }
}
