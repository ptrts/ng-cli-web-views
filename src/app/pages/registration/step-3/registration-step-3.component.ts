import {Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ModalService} from '../../../common/components/modal/modal.service';
import {DateTextMaskService} from '../../../common/forms/inputs/date/date-text-mask.service';
import {PhoneTextMaskService} from '../../../common/forms/inputs/phone/phone-text-mask.service';
import {
  APP_VALIDATION_MESSAGES_PROVIDER,
  ValidationMessages,
  ValidationMessagesProvider
} from '../../../common/forms/validation/validation-message-component/validation-message.component';
import {OurServerApi} from '../../../server/our-server-api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-step-3',
  templateUrl: './registration-step-3.component.html',
  styleUrls: [
    './registration-step-3.component.css'
  ],
  providers: [
    {
      provide: APP_VALIDATION_MESSAGES_PROVIDER,
      useExisting: forwardRef(() => RegistrationStep3Component)
    }
  ]
})
export class RegistrationStep3Component implements OnInit, ValidationMessagesProvider {

  JSON = JSON;

  readonly VALIDITY_YEARS_MAX = 25;

  readonly ISSUE_DATE_MIN = moment().subtract(this.VALIDITY_YEARS_MAX, 'year').toDate();

  readonly ISSUE_DATE_MAX = moment().toDate();

  model = new RegistrationStep3();

  form: FormGroup;

  private validationMessages = {
    series: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
    number: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
    issueDate: {
      required: 'Значение не заполнено',
      dateTooEarly: 'Слишком старый паспорт',
      dateTooLate: 'Дата выдачи не должна быть в будущем',
      pattern: 'Некорректное значение'
    },
    whereIssued: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
    snils: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
  };

  readonly snilsTextMaskConf = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
    ],
    showMask: true
  };

  constructor(
    private fb: FormBuilder,
    public dateTextMaskService: DateTextMaskService,
    public phoneTextMaskService: PhoneTextMaskService,
    private modalService: ModalService,
    private ourServerApi: OurServerApi,
    private router: Router
  ) {}

  getMessages(formControlName: string): ValidationMessages {
    return this.validationMessages[formControlName];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      passport: this.fb.group(this.model.passport),
      snils: this.model.snils
    });
  }

  onNextClick() {

    this.form.markAsTouched();

    if (this.form.invalid) {

      Object.keys(this.form.controls)
        .forEach(formControlName => this.form.controls[formControlName].markAsTouched(), this);

      this.modalService.warning(`
        При заполнении формы были допущены ошибки. 
        Обратите внимание на пояснения красным цветом под полями формы.
      `);
    } else {

      let step = new RegistrationStep3();

      let formValue = this.form.value;

      Object.keys(formValue).forEach(key => {
        let value = formValue[key];
        step[key] = value;
      });

      console.log(JSON.stringify(step));

      this.ourServerApi.submitRegistrationStep3(step).subscribe(
        () => this.router.navigate(['profile']),
        () => this.modalService.warning('Что-то не так, сервер ругается')
      );
    }
  }
}

export class Passport {
  series = '';
  number = '';
  issueDate: Date = null;
  whereIssued = '';
}

export class RegistrationStep3 {
  passport = new Passport();
  snils = '';
}
