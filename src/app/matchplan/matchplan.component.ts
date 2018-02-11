import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.scss']
})
export class MatchplanComponent implements OnInit {

  version: string = environment.version;

  constructor() { }

  ngOnInit() { }

}
