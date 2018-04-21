import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact_person } from '@app/api/openapi';

export interface ContactPersonViewModel {
  title: string;
  contact: Contact_person;
}

@Component({
  selector: 'app-contact-dialog',
  templateUrl: 'contact.dialog.component.html',
  styleUrls: ['contact.dialog.component.scss'],
})
export class ContactDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactPersonViewModel[]) { }

  ngOnInit() {
  }
}
