import { Injectable } from '@angular/core';
import { QueueingSubject } from 'queueing-subject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatchService } from './match.service';
import websocketConnect, { Connection } from 'rxjs-websockets';
import { retryWhen, delay, share } from 'rxjs/operators';
import { WebSocketMessage, WebSocketMessageTypes } from '../../../shared/models/websocket.model';
import { PitchService } from './pitch.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private inputStream: QueueingSubject<string> = new QueueingSubject<string>();
  public messages: Observable<string>;

  constructor(
    private matchService: MatchService,
    private pitchService: PitchService
  ) {
  }

  init() {
    this.messages = websocketConnect(
      environment.wsServerUrl,
      this.inputStream,
      null,
      (url, protocols) => new WebSocket(url, protocols)
    ).messages.pipe(
      share()
    );

    this.messages.pipe(
      retryWhen(errors => errors.pipe(delay(60000)))
    ).subscribe(
      (message) => {
        try {
          const msg: WebSocketMessage = JSON.parse(message);
          switch (msg.type) {
            case WebSocketMessageTypes.MATCH_UPDATED:
              this.matchService.matchUpdated.next(msg.data);
              break;
            case WebSocketMessageTypes.PITCH_ADDED:
              this.pitchService.pitchAdded.next(null);
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
