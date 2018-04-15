import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teamadmin',
  templateUrl: './teamadmin.component.html',
  styleUrls: ['./teamadmin.component.scss']
})
export class TeamAdminComponent implements OnInit {

  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  
  constructor() { }

  ngOnInit() { }

}
