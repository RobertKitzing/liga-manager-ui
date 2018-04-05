import { Logger } from '@app/core';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

const log = new Logger('MatchService');
@Injectable()
export class MatchService {
    public messages: Subject<string>;

    constructor(wsService: WebsocketService) {
        this.messages = <Subject<string>>wsService
            .connect()
            .map((response: MessageEvent): string => {
                log.debug(response);
                return response.data;
            });
    }
}
