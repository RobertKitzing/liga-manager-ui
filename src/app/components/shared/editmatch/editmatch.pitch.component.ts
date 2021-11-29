import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMapTo } from 'rxjs/operators';
import { PitchService } from '../../../services/pitch.service';
import { Match, Pitch } from 'src/api/graphql';
import { MatchService } from '../../../services/match.service';
import { CreatePitchDialogComponent } from '../create-pitch-dialog/create-pitch-dialog.component';

@Component({
  selector: 'app-editmatch.pitch',
  templateUrl: './editmatch.pitch.component.html',
  styleUrls: ['./editmatch.pitch.component.css']
})
export class EditmatchPitchComponent implements OnInit {

  newMatchPitch: FormControl = new FormControl();
  filteredPitches: Observable<Pitch[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public match: Match,
    private pitchService: PitchService,
    private matchService: MatchService,
    private dialogRef: MatDialogRef<EditmatchPitchComponent>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.filteredPitches = this.newMatchPitch.valueChanges.pipe(
      startWith<string | Pitch>(''),
      map(value => typeof value === 'string' ? value : value.label),
      switchMapTo(this.pitchService.allPitches),
      map(x => {
        return (this.newMatchPitch.value && (typeof this.newMatchPitch.value === 'string')) ?
          x.filter(y => y.label.toLowerCase().includes(this.newMatchPitch.value.toLowerCase())) : x;
      })
    );
  }

  displayPitch(pitch?: Pitch): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  onPitchSelect(pitch: Pitch) {
    this.match.pitch = pitch;
  }

  async onSaveClicked() {
    try {
      await this.matchService.locateMatch(this.match.id, this.newMatchPitch.value);
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
    }
  }

  showCreateNewPitch() {
    this.dialog.open(CreatePitchDialogComponent);
  }
}
