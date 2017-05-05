import {Injectable} from '@angular/core';
import {SessionStatus} from './session-status/session-status';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {OurBackend} from './backend/our-backend';

@Injectable()
export class OurServerApi {

  constructor(private ourBackend: OurBackend) {}

  getSessionStatus(): Observable<SessionStatus> {
    return Observable
      .of(this.ourBackend.sessionStatus)
      .delay(500);
  }
}
