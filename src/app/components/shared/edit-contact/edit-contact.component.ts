import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserGQL, UpdateTeamContactGQL, Contact } from 'src/api/graphql';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  @Input() contact: Contact.Fragment;

  @Output() contactChanged = new EventEmitter<Contact.Fragment>();

  emailFormControl: FormControl = new FormControl('', [Validators.email, Validators.required]);

  constructor(

  ) { }

  ngOnInit() {
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
