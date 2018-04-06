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

const SERVER_URL = 'ws://localhost:9898';
const input = new QueueingSubject<string>();
const { messages, connectionStatus } = websocketConnect(SERVER_URL, input);


@Injectable()
export class WebsocketService {

    private inputStream: QueueingSubject<string> = new QueueingSubject<string>();
    public messages: Observable<string>;

    matchUpdate: Subject<string> = new Subject<string>();

    constructor() {
        this.messages = websocketConnect(
            SERVER_URL,
            this.inputStream
        ).messages.share();

        this.messages.retryWhen(errors => errors.delay(1000)).subscribe(
            (message) => {
                const data = JSON.parse(message);
                if (data.type = 'matchUpdate') {
                    this.matchUpdate.next(data.data);
                }
            }
        );
     }

    send(data: any) {
        const str = JSON.stringify(data);
        this.inputStream.next(str);
    }

}
