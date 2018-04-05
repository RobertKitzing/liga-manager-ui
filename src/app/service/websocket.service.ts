import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const CHAT_URL = 'ws://localhost:8080';
@Injectable()
export class WebsocketService {
    constructor() { }

    private subject: Subject<MessageEvent>;

    public connect(): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(CHAT_URL);
            console.log('Successfully connected: ' + CHAT_URL);
        }
        return this.subject;
    }

    private create(url: string): Subject<MessageEvent> {
        let ws = new WebSocket(url);

        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            });
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return Subject.create(observer, observable);
    }

}
