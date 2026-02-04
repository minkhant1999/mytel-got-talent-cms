import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map, Observable, take } from 'rxjs';
import { WS_URL } from 'src/assets/app.config.js';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;

  connect() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(`${WS_URL}/cms/auth/vote-switch`);
    }
  }

  connect2() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(`${WS_URL}/cms/auth/announcement-switch`);
    }
  }

  voteSwitch(enabled: boolean) {
    this.connect();

    // send
    this.socket$.next({ enabled });

    // wait for ONE reply only
    return this.socket$.pipe(
      take(1),
      map((res: any) => res.result.votingEnabled),
    );
  }

  resultSwitch(enabled: boolean) {
    this.connect();

    // send
    this.socket$.next({ enabled });

    // wait for ONE reply only
    return this.socket$.pipe(
      take(1),
      map((res: any) => res.result.announcementEnabled),
    );
  }

  close() {
    this.socket$.complete();
  }
}
