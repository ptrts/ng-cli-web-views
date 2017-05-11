import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {OurBackend} from './backend/our-backend';
import {SessionStatus} from './session-status/session-status';
import {OurCacheService} from '../common/cache/cache.service';

@Injectable()
export class OurServerApi {

  constructor(private ourBackend: OurBackend, private ourCacheService: OurCacheService) {
  }

  private _getSessionStatus(): Observable<SessionStatus> {
    return Observable
      .of<SessionStatus>(this.ourBackend.sessionStatus)
      .delay(500);
  }

  getSessionStatus(): Observable<SessionStatus> {

    console.log('this = ' + this);

    return this.ourCacheService.getCachedObservable<SessionStatus>('sessionStatus', 0.5, this._getSessionStatus, this);
  }

  private _getUtcOffset(): number {

    console.log('Мы в методе, сейчас вернем = ' + this.ourBackend.utcOffset);

    return this.ourBackend.utcOffset;
  }

  getUtcOffset(): number {
    return this.ourCacheService.getCached<number>('utcOffset', Number.MAX_SAFE_INTEGER, this._getUtcOffset, this);
  }
}

