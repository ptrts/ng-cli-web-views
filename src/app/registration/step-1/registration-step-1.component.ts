import {Component} from '@angular/core';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
  selector: 'app-registration-step-1',
  templateUrl: './registration-step-1.component.html',
  styleUrls: [
    './registration-step-1.component.css'
  ]
})
export class RegistrationStep1Component {

  lastName: string;

  firstName: string;

  middleName: string;

  birthDate: Date;

  sex: string;

  phoneNumber: string;

  consentToEverything: boolean;

  consentToReceivingInfo: boolean;

  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

  dateMask =
    [
      /[0-3]/,
      /\d/,
      '.',
      /[0-1]/,
      /\d/,
      '.',
      /[1-2]/,
      /\d/,
      /\d/,
      /\d/
    ];

  phoneMask =
    [
      '(',
      /\d/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ];

  onConsentToEverythingChanged(value: boolean) {
    console.log('RegistrationStep1Component.onConsentToEverythingChanged()');
    this.consentToEverything = value;
  }

  onConsentToReceivingInfo(value: boolean) {
    console.log('RegistrationStep1Component.onConsentToReceivingInfo()');
    this.consentToReceivingInfo = value;
  }
}
