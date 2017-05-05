import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {OurServerApi} from '../server/our-server-api';
import {SessionStatus} from '../server/session-status/session-status';
import {DateUtils} from '../utils/date-utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  amount = 10000;

  period = 12;

  constructor(private cookieService: CookieService, private router: Router, private ourServer: OurServerApi) {
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

    console.log('onGetLoanClicked');

    let sessionId = this.cookieService.get('JSESSIONID');

    // todo Кука пускай пока что как бы всегда будет
    sessionId = '123456789';

    if (sessionId) {
      this.ourServer.getSessionStatus().subscribe(
        (sessionStatus: SessionStatus) => {
          // todo Сделать навигацию куда надо, в зависимости от того, какой у нас статус у сессии

          this.router.navigate(['reg1']);

          console.log('sessionStatus = ' + sessionStatus);
        },
        (error: any) => {
          console.error('Error while getting the session status from the server');
        }
      );
    }
  }
}
