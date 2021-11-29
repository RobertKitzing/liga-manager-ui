import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Contact } from 'src/api/graphql';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  @Input() contact: Contact;

  @Output() contactChanged = new EventEmitter<Contact>();

  emailFormControl: FormControl = new FormControl('', [Validators.email, Validators.required]);

  constructor(

  ) { }

  ngOnInit() {
    this.emailFormControl.setValue(this.contact.email);
  }

  emitContactChanged(firstName: string, lastName: string, email: string, phone: string) {
    this.contactChanged.emit({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    });
  }

  isEmailValidOrEmpty(mail: string) {
    return mail ? this.emailFormControl.valid : true;
  }
}
