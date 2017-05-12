import {Injectable} from '@angular/core';
import {CacheService} from 'ng2-cache';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {OurCacheService} from '../common/cache/cache.service';
import {RegistrationStep1} from '../pages/registration/step-1/registration-step-1.component';
import {RegistrationStep2} from '../pages/registration/step-2/registration-step-2.component';
import {RegistrationStep3} from '../pages/registration/step-3/registration-step-3.component';
import {OurBackend} from './backend/our-backend';
import {SessionStatus} from './session-status/session-status';

@Injectable()
export class OurServerApi {

  constructor(private ourBackend: OurBackend, private ourCacheService: OurCacheService, private cacheService: CacheService) {
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

  submitRegistrationStep1(step: RegistrationStep1): Observable<any> {

    // return Observable.throw(null).delay(500);

    return Observable
      .of(null)
      .delay(500)
      .do(() => {
        this.ourBackend.sessionStatus = SessionStatus.REGISTRATION_STEP_1;
        this.cacheService.set('sessionStatus', SessionStatus.REGISTRATION_STEP_1, {maxAge: 0.5});
      });
  }

  submitRegistrationStep2(step: RegistrationStep2): Observable<any> {

    // return Observable.throw(null).delay(500);

    return Observable
      .of(null)
      .delay(500)
      .do(() => {
        this.ourBackend.sessionStatus = SessionStatus.REGISTRATION_STEP_2;
        this.cacheService.set('sessionStatus', SessionStatus.REGISTRATION_STEP_2, {maxAge: 0.5});
      });
  }

  submitRegistrationStep3(step: RegistrationStep3): Observable<any> {

    // return Observable.throw(null).delay(500);

    return Observable
      .of(null)
      .delay(500)
      .do(() => {
        this.ourBackend.sessionStatus = SessionStatus.LOGGED_IN;
        this.cacheService.set('sessionStatus', SessionStatus.LOGGED_IN, {maxAge: 0.5});
      });
  }
}
