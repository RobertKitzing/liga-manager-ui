import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LatestEventGQL, Event } from 'src/api/graphql';
import { I18Service } from 'src/app/services/i18.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  latestEvents: Observable<Event.Fragment[]>;

  constructor(
    private latestEventsGQL: LatestEventGQL,
    public i18Service: I18Service
  ) { }

  ngOnInit() {
    this.latestEvents = this.latestEventsGQL.watch().valueChanges.pipe(
      map(({ data }) => data.latestEvents.sort((a, b) => a.occurred_at < b.occurred_at ? 1 : -1))
    );
  }

}
