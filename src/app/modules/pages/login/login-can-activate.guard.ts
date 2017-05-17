import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {OurServerApi} from '../../../server/our-server-api';
import {SessionStatus} from '../../../server/session-status/session-status';

@Injectable()
export class LoginCanActivateGuard implements CanActivate {

  constructor(private ourServerApi: OurServerApi, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.ourServerApi.getSessionStatus().map(
      (sessionStatus: SessionStatus) => {

        let sessionStatusStr = SessionStatus[sessionStatus];

        switch (sessionStatus) {
          case SessionStatus.LOGGED_IN:
            this.router.navigate(['profile']);
            return false;
          case SessionStatus.NOT_REGISTERED:
          case SessionStatus.REGISTRATION_STEP_1:
          case SessionStatus.REGISTRATION_STEP_2:
          case SessionStatus.LOGGED_OUT:
            return true;
          default:
            throw new Error(`Непредусмотренное состояние сессии ${sessionStatusStr}`);
        }
      }
    );
  }
}
