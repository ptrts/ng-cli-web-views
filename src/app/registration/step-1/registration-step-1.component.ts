import {Component, OnInit} from '@angular/core';
import {DateTextMaskService} from '../../date-text-mask.service';
import {PhoneTextMaskService} from '../../phone-text-mask.service';

@Component({
  selector: 'app-registration-step-1',
  templateUrl: './registration-step-1.component.html',
  styleUrls: [
    './registration-step-1.component.css'
  ]
})
export class RegistrationStep1Component implements OnInit {

  lastName: string = 'Иванов';

  firstName: string;

  middleName: string;

  birthDate: Date = new Date(1980, 12 - 1, 31);

  birthDateInputValue: string;

  sex: string;

  phoneNumber: string = '9139077844';

  phoneNumberInputValue: string;

  consentToEverything: boolean;

  consentToReceivingInfo: boolean;

  validationMessages: {
    lastName: {
      required: 'Фамилия не указана'
    },
    firstName: {
      required: 'Имя не указано'
    },
    middleName: {

    },
    birthDate: {

    },
    phoneNumber: {

    }
  };

  constructor(
    public dateTextMaskService: DateTextMaskService,
    public phoneTextMaskService: PhoneTextMaskService
  ) {}

  ngOnInit(): void {
    this.birthDateInputValue = this.dateTextMaskService.toInputValue(this.birthDate);
    this.phoneNumberInputValue = this.phoneTextMaskService.toInputValue(this.phoneNumber);
  }

  onConsentToEverythingChanged(value: boolean) {
    console.log('RegistrationStep1Component.onConsentToEverythingChanged()');
    this.consentToEverything = value;
  }

  onConsentToReceivingInfo(value: boolean) {
    console.log('RegistrationStep1Component.onConsentToReceivingInfo()');
    this.consentToReceivingInfo = value;
  }
}
