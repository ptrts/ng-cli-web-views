import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {OurServerApi} from '../../../../server/our-server-api';
import 'rxjs/add/operator/map';
import {SessionStatus} from '../../../../server/session-status/session-status';

@Injectable()
export class RegistrationStep2CanActivateGuard implements CanActivate {

  constructor(private ourServerApi: OurServerApi, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.ourServerApi.getSessionStatus().map(
      (sessionStatus: SessionStatus) => {

        if (sessionStatus === SessionStatus.REGISTRATION_STEP_1) {
          return true;
        } else {
          this.router.navigate(['restricted']);
          return false;
        }
      }
    );
  }
}
