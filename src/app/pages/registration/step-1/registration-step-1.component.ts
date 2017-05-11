import {Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {DateTextMaskService} from '../../../common/forms/inputs/date/date-text-mask.service';
import {PhoneTextMaskService} from '../../../common/forms/inputs/phone/phone-text-mask.service';
import {
  APP_VALIDATION_MESSAGES_PROVIDER,
  ValidationMessages,
  ValidationMessagesProvider
} from '../../../common/forms/validation/validation-message-component/validation-message.component';

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

  readonly AGE_MIN = 18;

  readonly AGE_MAX = 80;

  readonly BIRTH_DATE_MIN = moment().subtract(this.AGE_MAX, 'year').toDate();

  readonly BIRTH_DATE_MAX = moment().subtract(this.AGE_MIN, 'year').toDate();

  model = new RegistrationStep1();

  form: FormGroup;

  private validationMessages = {
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
    private fb: FormBuilder,
    public dateTextMaskService: DateTextMaskService,
    public phoneTextMaskService: PhoneTextMaskService
  ) {}

  getMessages(formControlName: string): ValidationMessages {

    const validationMessages = this.validationMessages[formControlName];

    if (validationMessages === null) {
      throw new Error(`В компоненте не нашлось ValidationMessages по ключу ${formControlName}`);
    }

    return validationMessages;
  }

  ngOnInit(): void {

    this.form = this.fb.group(
      this.model
    );

    this.form.patchValue({
      birthDate: this.dateTextMaskService.toInputValue(this.model.birthDate),
      phoneNumber: this.phoneTextMaskService.toInputValue(this.model.phoneNumber)
    });
  }
}

export class RegistrationStep1 {

  lastName = 'Иванов';

  firstName = '';

  middleName = '';

  birthDate: Date = new Date(1980, 12 - 1, 31);

  sex = '';

  phoneNumber = '9139077844';

  consentToEverything = false;

  consentToReceivingInfo = false;
}
