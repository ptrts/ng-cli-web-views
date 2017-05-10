import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {OurServerApi} from '../../../server/our-server-api';
import 'rxjs/add/operator/map';
import {SessionStatus} from '../../../server/session-status/session-status';

@Injectable()
export class RegistrationStep1CanActivateGuard implements CanActivate {

  constructor(private ourServerApi: OurServerApi) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.ourServerApi.getSessionStatus().map(
      (sessionStatus: SessionStatus) => {
        return sessionStatus === SessionStatus.NOT_REGISTERED;
      }
    );
  }
}
