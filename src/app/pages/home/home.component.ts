import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {DateUtils} from '../../common/utils/date-utils';
import {OurBackend} from '../../server/backend/our-backend';
import {OurServerApi} from '../../server/our-server-api';
import {SessionStatus} from '../../server/session-status/session-status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  amount = 10000;

  period = 12;

  SessionStatus = SessionStatus;

  constructor(private cookieService: CookieService,
              private router: Router,
              private ourServer: OurServerApi,
              public ourBackend: OurBackend
      ) {
  }

  get amountToReturn(): number {
    return Math.round(this.amount * (1 + 0.02 * this.period));
  }

  get dueDate(): Date {
    return DateUtils.addDaysInDate(new Date(), this.period);
  }

  onAmountChanged(amount: number) {
    this.amount = amount;
  }

  onPeriodChanged(period: number) {
    this.period = period;
  }

  onGetLoanClicked() {

    let sessionId = this.cookieService.get('JSESSIONID');

    // todo Кука пускай пока что как бы всегда будет
    sessionId = '123456789';

    if (sessionId) {
      this.ourServer.getSessionStatus().subscribe(
        (sessionStatus: SessionStatus) => {
          switch (sessionStatus) {
            case SessionStatus.NOT_REGISTERED:
              this.router.navigate(['reg1']);
              break;
            case SessionStatus.REGISTRATION_STEP_1:
              this.router.navigate(['reg2']);
              break;
            case SessionStatus.REGISTRATION_STEP_2:
              this.router.navigate(['reg3']);
              break;
            case SessionStatus.LOGGED_IN:
              this.router.navigate(['profile']);
              break;
            case SessionStatus.LOGGED_OUT:
              this.router.navigate(['login']);
          }
        }
      );
    }
  }
}
