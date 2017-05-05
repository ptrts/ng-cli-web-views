
import {Injectable} from '@angular/core';
import {SessionStatus} from '../session-status/session-status';

@Injectable()
export class OurBackend {
  sessionStatus: SessionStatus = SessionStatus.NOT_REGISTERED;
}
