import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MatchService } from './match.service';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import websocketConnect, { Connection } from 'rxjs-websockets';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

const SERVER_PORT: number = 9898;


@Injectable()
export class WebsocketService {

    private inputStream: QueueingSubject<string> = new QueueingSubject<string>();
    public messages: Observable<string>;

    matchUpdated: Subject<string> = new Subject<string>();
    pitchAdded: Subject<string> = new Subject<string>();

    constructor() {
        const url: string = `ws://${window.location.hostname}:${SERVER_PORT}`;
        this.messages = websocketConnect(
            url,
            this.inputStream
        ).messages.share();

        this.messages.retryWhen(errors => errors.delay(1000)).subscribe(
            (message) => {
                const data = JSON.parse(message);
                if (data.type = 'matchUpdated') {
                    this.matchUpdated.next(data.data);
                }
                if (data.type = 'pitchAdded') {
                    this.pitchAdded.next(data.data);
                }
            }
        );
     }

    send(data: any) {
        const str = JSON.stringify(data);
        this.inputStream.next(str);
    }

}
