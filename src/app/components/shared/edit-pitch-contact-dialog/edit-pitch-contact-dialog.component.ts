import { Component, OnInit, Inject } from '@angular/core';
import { Pitch, Contact, UpdatePitchContactGQL } from 'src/api/graphql';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-pitch-contact-dialog',
  templateUrl: './edit-pitch-contact-dialog.component.html',
  styleUrls: ['./edit-pitch-contact-dialog.component.css']
})
export class EditPitchContactDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public pitch: Pitch.Fragment,
    private notify: NotificationService,
    private dialogRef: MatDialogRef<EditPitchContactDialogComponent>,
    private translateService: TranslateService,
    private updatePitchContactGQL: UpdatePitchContactGQL
  ) { }

  ngOnInit() {
  }

  async contactChanged(contact: Contact.Fragment) {
    try {
      await this.updatePitchContactGQL.mutate(
        {
          pitch_id: this.pitch.id,
          ...contact
        }
      ).toPromise();
      this.notify.showSuccessNotification(this.translateService.instant('PITCH_CONTACT_SAVE_SUCCESS'));
      this.dialogRef.close();
    } catch (error) {
      this.notify.showSuccessNotification(this.translateService.instant('PITCH_CONTACT_SAVE_ERROR'), error);
    }
  }
}
