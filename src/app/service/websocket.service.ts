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
import { environment } from '@env/environment';

const SERVER_PORT: number = 9898;

export interface WebSocketMessage {
    type: string;
    data: any;
}
@Injectable()
export class WebsocketService {

    private inputStream: QueueingSubject<string> = new QueueingSubject<string>();
    public messages: Observable<string>;

    matchUpdated: Subject<string> = new Subject<string>();
    pitchAdded: Subject<string> = new Subject<string>();
    reportSent: Subject<any> = new Subject<any>();

    constructor() {
        const url: string = environment.wsServerUrl;
        this.messages = websocketConnect(
            url,
            this.inputStream
        ).messages.share();

        this.messages.retryWhen(errors => errors.delay(60000)).subscribe(
            (message) => {
                try {
                    const msg: WebSocketMessage = JSON.parse(message);
                    switch (msg.type) {
                        case 'matchUpdated':
                            this.matchUpdated.next(msg.data);
                            break;
                        case 'pitchAdded':
                            this.pitchAdded.next(msg.data);
                            break;
                        case 'reportSent':
                            this.reportSent.next(msg.data);
                            break;
                    }
                } catch {
                    console.error('Error parsing WS Message');
                }
            }
        );
     }

    send(data: WebSocketMessage) {
        const str = JSON.stringify(data);
        this.inputStream.next(str);
    }

}
