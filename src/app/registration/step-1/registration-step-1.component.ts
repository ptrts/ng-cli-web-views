import {Component, forwardRef, OnInit} from '@angular/core';
import {DateTextMaskService} from '../../date-text-mask.service';
import {PhoneTextMaskService} from '../../phone-text-mask.service';
import * as moment from 'moment';
import {
  APP_VALIDATION_MESSAGES_PROVIDER,
  ValidationMessages,
  ValidationMessagesProvider
} from '../../validation-message/validation-message.component';

@Component({
  selector: 'app-registration-step-1',
  templateUrl: './registration-step-1.component.html',
  styleUrls: [
    './registration-step-1.component.css'
  ],
  providers: [
    {
      provide: APP_VALIDATION_MESSAGES_PROVIDER,
      useExisting: forwardRef(() => RegistrationStep1Component)
    }
  ]
})
export class RegistrationStep1Component implements OnInit, ValidationMessagesProvider {

  JSON = JSON;

  getMessages(formControlName: string): ValidationMessages {

    let validationMessages = this.validationMessages[formControlName];

    if (validationMessages === null) {
      throw new Error(`В компоненте не нашлось ValidationMessages по ключу ${formControlName}`);
    }

    return validationMessages;
  }

  readonly AGE_MIN = 18;

  readonly AGE_MAX = 80;

  readonly BIRTH_DATE_MIN = moment().subtract(this.AGE_MAX, 'year').toDate();

  readonly BIRTH_DATE_MAX = moment().subtract(this.AGE_MIN, 'year').toDate();

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

  validationMessages = {
    lastName: {
      required: 'Фамилия не указана',
      pattern: 'Можно использовать только русские буквы'
    },
    firstName: {
      required: 'Имя не указано',
      pattern: 'Можно использовать только русские буквы'
    },
    middleName: {
      pattern: 'Можно использовать только русские буквы'
    },
    birthDate: {
      required: 'Дата рождения не указана',
      dateEmpty: 'Дата рождения не указана',
      dateTooEarly: `Займы предоставляются гражданам возрастом до ${this.AGE_MAX} лет`,
      dateTooLate: `Займы предоставляются гражданам старше ${this.AGE_MIN} лет`
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
