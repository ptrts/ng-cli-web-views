import {Component, OnInit} from '@angular/core';
import {SessionStatus} from '../../session-status/session-status';
import {OurBackend} from '../our-backend';

@Component({
  selector: 'app-session-status',
  templateUrl: './session-status.component.html'
})
export class SessionStatusComponent implements OnInit {

  model: number;

  buttonModels: ButtonModel[];

  constructor(private ourBackend: OurBackend) {}

  ngOnInit(): void {

    const allSessionStatuses = [
      SessionStatus.NOT_REGISTERED,
      SessionStatus.REGISTRATION_STEP_1,
      SessionStatus.REGISTRATION_STEP_2,
      SessionStatus.LOGGED_IN,
      SessionStatus.LOGGED_OUT,
    ];

    this.buttonModels = allSessionStatuses.map((sessionStatus: SessionStatus) => {
      return new ButtonModel(sessionStatus);
    });

    this.model = this.ourBackend.sessionStatus;
  }

  onChanged(sessionStatus: SessionStatus) {

    console.log('before: ' + this.ourBackend.sessionStatus);

    this.ourBackend.sessionStatus = this.model;

    console.log('after: ' + this.ourBackend.sessionStatus);
  }
}

class ButtonModel {
  index: number;
  name: string;
  constructor(sessionStatus: SessionStatus) {
    this.index = sessionStatus;
    this.name = SessionStatus[sessionStatus];
  }
}
