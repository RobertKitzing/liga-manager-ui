import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Team } from '../../../../api';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public teams: Team[]) { }

  ngOnInit() {
  }

}
