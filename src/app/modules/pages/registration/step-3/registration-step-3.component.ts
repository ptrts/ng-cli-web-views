import {Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ModalService} from '../../../global-services/modal/modal.service';
import {OurServerApi} from '../../../../server/our-server-api';
import {Router} from '@angular/router';
import {
  APP_VALIDATION_MESSAGES_PROVIDER, ValidationMessages,
  ValidationMessagesProvider
} from '../../../page-elements/validation-message-component/validation-message.component';
import {DateTextMaskService} from '../../../page-elements/text-mask/date/date-text-mask.service';

@Component({
  selector: 'app-registration-step-3',
  templateUrl: './registration-step-3.component.html',
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
      required: 'Серия не указана',
      textMaskIncomplete: 'Серия заполнена не полностью',
    },
    number: {
      required: 'Номер не указан',
      textMaskIncomplete: 'Номер заполнен не полностью',
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

  readonly seriesTextMaskConf = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    showMask: true
  };

  readonly numberTextMaskConf = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    showMask: true
  };

  constructor(
    private fb: FormBuilder,
    public dateTextMaskService: DateTextMaskService,
    private modalService: ModalService,
    private ourServerApi: OurServerApi,
    private router: Router
  ) {}

  getMessages(formControlName: string): ValidationMessages {
    return this.validationMessages[formControlName];
  }

  ngOnInit(): void {
    let passport = this.model.passport;
    this.form = this.fb.group({
      passport: this.fb.group({
        series: passport.series,
        number: passport.number,
        issueDate: this.dateTextMaskService.toInputValue(passport.issueDate),
        whereIssued: passport.whereIssued
      }),
      snils: this.model.snils
    });
  }

  onNextClick() {

    if (this.form.invalid) {

      Object.keys(this.form.controls)
        .forEach(formControlName => {
          let control = this.form.controls[formControlName];
          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: false, emitEvent: true});
        }, this);

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
