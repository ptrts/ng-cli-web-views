import {ApplicationRef, Component, ElementRef, forwardRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {DateTextMaskService} from '../../../_modules/date-text-mask/date-text-mask.service';
import {PhoneTextMaskService} from '../../../_modules/phone-text-mask/phone-text-mask.service';
import {ModalService} from '../../../common/components/modal/modal.service';

import {
  APP_VALIDATION_MESSAGES_PROVIDER,
  ValidationMessages,
  ValidationMessagesProvider
} from '../../../common/forms/validation/validation-message-component/validation-message.component';
import {OurServerApi} from '../../../server/our-server-api';

@Component({
  selector: 'app-registration-step-1',
  templateUrl: './registration-step-1.component.html',
  providers: [
    {
      provide: APP_VALIDATION_MESSAGES_PROVIDER,
      useExisting: forwardRef(() => RegistrationStep1Component)
    }
  ]
})
export class RegistrationStep1Component implements OnInit, ValidationMessagesProvider {

  JSON = JSON;

  @ViewChild('verificationCode')
  verificationCodeElementRef: ElementRef;

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
      dateTooEarly: `Займы предоставляются гражданам возрастом до ${this.AGE_MAX} лет`,
      dateTooLate: `Займы предоставляются гражданам старше ${this.AGE_MIN} лет`
    },
    phoneNumber: {

    },
    consentToEverything: {
      required: 'Для получения займа необходимо ваше согласие'
    },
    consentToReceivingInfo: {
      required: 'Для получения займа необходимо ваше согласие'
    },
    sex: {
      required: 'Не указан пол'
    }
  };

  readonly verificationCodeTextMaskConfig = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    showMask: true
  };

  verificationCodeAlive = false;

  verificationCodeSeconds: number;

  verificationCodeTimerSubscription: Subscription;

  showVerifyButton = true;

  verifyButtonSeconds: number;

  constructor(
    private fb: FormBuilder,
    public dateTextMaskService: DateTextMaskService,
    public phoneTextMaskService: PhoneTextMaskService,
    private modalService: ModalService,
    private ourServerApi: OurServerApi,
    private router: Router,
    private applicationRef: ApplicationRef
  ) {}

  getMessages(formControlName: string): ValidationMessages {
    return this.validationMessages[formControlName];
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

  verifyOnClick() {

    let phoneNumberControl: FormControl = <FormControl>this.form.get('phoneNumber');
    let verificationCodeControl: FormControl = <FormControl>this.form.get('verificationCode');

    if (!phoneNumberControl.valid) {
      this.modalService.warning('Необходимо ввести корректный номер телефона');
      return;
    }

    if (this.verificationCodeTimerSubscription) {
      this.verificationCodeTimerSubscription.unsubscribe();
    }

    let phone = this.phoneTextMaskService.fromInputValue(phoneNumberControl.value);

    let that = this;

    this.ourServerApi.sendPhoneNumberVerificationCode(phone).take(1).subscribe(() => {

      verificationCodeControl.setValue('');

      that.verificationCodeAlive = true;
      that.verificationCodeSeconds = 10;

      that.verificationCodeTimerSubscription = Observable.interval(1000).take(that.verificationCodeSeconds).subscribe(
        () => that.verificationCodeSeconds--,
        null,
        () => {
          that.verificationCodeAlive = false;
          verificationCodeControl.setValue('');
        }
      );

      that.showVerifyButton = false;
      that.verifyButtonSeconds = 5;

      Observable.interval(1000).take(that.verifyButtonSeconds).subscribe(
        () => that.verifyButtonSeconds--,
        null,
        () => that.showVerifyButton = true
      );

      this.applicationRef.tick();

      let element = this.verificationCodeElementRef.nativeElement;
      element.focus();
      element.setSelectionRange(0, 0);
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

      let step = new RegistrationStep1();

      let formValue = this.form.value;

      Object.keys(formValue).forEach(key => {

        let value = formValue[key];

        if (key === 'phoneNumber') {
          value = this.phoneTextMaskService.fromInputValue(value);
        }

        if (key === 'birthDate') {
          value = this.dateTextMaskService.fromInputValue(value);
        }

        step[key] = value;
      });

      console.log(JSON.stringify(step));

      this.ourServerApi.submitRegistrationStep1(step).subscribe(
        () => {
          console.log('OK');
          this.router.navigate(['reg2']);
        },
        () => {

          console.log('Error 1');

          this.modalService.warning('Что-то не так, сервер ругается');

          console.log('Error 2');
        }
      );

    }
  }
}

export class RegistrationStep1 {

  lastName = '';

  firstName = '';

  middleName = '';

  birthDate: Date = null;

  sex = '';

  phoneNumber = '';

  verificationCode = '';

  consentToEverything = false;

  consentToReceivingInfo = false;
}
