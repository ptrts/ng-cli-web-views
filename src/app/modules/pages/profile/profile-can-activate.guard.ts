import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {OurServerApi} from '../../../server/our-server-api';
import {SessionStatus} from '../../../server/session-status/session-status';

@Injectable()
export class ProfileCanActivateGuard implements CanActivate {

  constructor(private ourServerApi: OurServerApi, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.ourServerApi.getSessionStatus().map(
      (sessionStatus: SessionStatus) => {

        switch (sessionStatus) {
          case SessionStatus.LOGGED_IN:
            return true;
          case SessionStatus.NOT_REGISTERED:
          case SessionStatus.LOGGED_OUT:
            this.router.navigate(['login']);
            return false;
          default:
            this.router.navigate(['restricted']);
            return false;
        }
      }
    );
  }
}
