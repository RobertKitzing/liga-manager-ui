import { Observable } from 'rxjs/Observable';
import { Logger } from '@app/core';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

const log = new Logger('MatchService');
@Injectable()
export class MatchService {

    public matchId: Subject<string> = new Subject<string>();

    constructor(private wsService: WebsocketService) {
        this.wsService.matchUpdated.subscribe(
            (matchId) => {
                this.matchId.next(matchId);
            }
        );
    }

    updateMatch(matchId: string) {
        this.wsService.send({type: 'matchUpdated', data: matchId});
    }
}
