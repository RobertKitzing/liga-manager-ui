import { Observable } from 'rxjs/Observable';
import { Logger } from '@app/core';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { QueueingSubject } from 'queueing-subject/lib';
import { Match, Client, SubmitMatchResultBody } from '@app/api/openapi';

const log = new Logger('MatchService');
@Injectable()
export class MatchService {

    private inputStream: QueueingSubject<string> = new QueueingSubject<string>();
    public matchId: Subject<string> = new Subject<string>();

    constructor(
        private wsService: WebsocketService,
        private apiClient: Client) {
        this.matchId.subscribe(
            (matchId) => {
                this.matchId.next(matchId);
            }
        );
    }

    updateMatch(matchId: string) {
        this.wsService.send({ type: 'matchUpdated', data: matchId });
    }

    async submitMatchResult(matchId: string, body: SubmitMatchResultBody): Promise<boolean> {
        return new Promise<boolean>(
            (resolve) => {
                this.apiClient.submitMatchResult(matchId, body).subscribe(
                    () => {
                        resolve(true);
                    },
                    (error) => {
                        throw error;
                    }
                );
            }
        );
    }

    async getMatch(matchId: string): Promise<Match> {
        return new Promise<Match>(
            (resolve) => {
                this.apiClient.getMatch(matchId).subscribe(
                    (match) => {
                        resolve(match);
                    },
                    (error) => {
                        resolve(null);
                    }
                );
            }
        );
    }
}
