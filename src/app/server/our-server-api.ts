import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {CacheObservableService} from '../common/cache/cache-observable.service';
import {OurBackend} from './backend/our-backend';
import {SessionStatus} from './session-status/session-status';

@Injectable()
export class OurServerApi {

  constructor(private ourBackend: OurBackend, private cacheObservableService: CacheObservableService) {
  }

  private _getSessionStatus(thisArg: OurServerApi): Observable<SessionStatus> {
    return Observable
      .of(thisArg.ourBackend.sessionStatus)
      .delay(500);
  }

  getSessionStatus(): Observable<SessionStatus> {
    return this.cacheObservableService.getCached('sessionStatus', 0.5, this._getSessionStatus, this);
  }
}
