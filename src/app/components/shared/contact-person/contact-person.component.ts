import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/api/graphql';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {

  @Input() contact: Contact.Fragment;

  constructor() { }

  ngOnInit() {
  }

}
