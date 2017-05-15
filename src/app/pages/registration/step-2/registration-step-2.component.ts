import {AfterViewInit, Component, Directive, forwardRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ModalService} from '../../../common/components/modal/modal.service';
import {AbstractEmptyChecker} from '../../../common/forms/empty-checker/abstract-empty-checker';
import {DateTextMaskService} from '../../../common/forms/inputs/date/date-text-mask.service';
import {PhoneTextMaskService} from '../../../common/forms/inputs/phone/phone-text-mask.service';
import {
  APP_VALIDATION_MESSAGES_PROVIDER,
  ValidationMessages,
  ValidationMessagesProvider
} from '../../../common/forms/validation/validation-message-component/validation-message.component';
import {OurServerApi} from '../../../server/our-server-api';
import {DefaultTextMaskService} from '../../../common/forms/inputs/default-text-mask/text-mask.service';

@Directive({
  selector: '[addressFormGroup]'
})
export class AddressFormGroup {
  constructor(public emptyChecker: AbstractEmptyChecker, public controlContainer: ControlContainer) {
  }
}

@Component({
  selector: 'app-registration-step-2',
  templateUrl: './registration-step-2.component.html',
  styleUrls: [
    './registration-step-2.component.css'
  ],
  providers: [
    {
      provide: APP_VALIDATION_MESSAGES_PROVIDER,
      useExisting: forwardRef(() => RegistrationStep2Component)
    }
  ]
})
export class RegistrationStep2Component implements OnInit, AfterViewInit, ValidationMessagesProvider {

  @ViewChildren(AddressFormGroup)
  addressFormGroupEmptyCheckers: QueryList<AddressFormGroup>;

  JSON = JSON;

  model = new RegistrationStep2();

  form: FormGroup;

  addressesViewModel = [
    {
      header: 'Адрес регистрации',
      formGroupName: 'registrationAddress'
    },
    {
      header: 'Адрес фактического проживания',
      formGroupName: 'livingAddress'
    }
  ];

  private validationMessages = {
    region: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
    city: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
    street: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    },
    house: {
      required: 'Не указан дом',
      pattern: 'Дом указан неправильно'
    },
    building: {
      pattern: 'Корпус указан неправильно'
    },
    subBuilding: {
      pattern: 'Строение указано неправильно'
    },
    flat: {
      pattern: 'Квартира указана неправильно'
    },
    email: {
      required: 'Значение не заполнено',
      pattern: 'Некорректное значение'
    }
  };

  private livingAddressRequired = false;

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
    private defaultTextMaskService: DefaultTextMaskService,
    private modalService: ModalService,
    private ourServerApi: OurServerApi,
    private router: Router
  ) {}

  getMessages(formControlName: string): ValidationMessages {
    return this.validationMessages[formControlName];
  }

  addressFormGroup(address: Address, requiredValidatorFn: ValidatorFn) {

    return this.fb.group({
        region: [address.region, requiredValidatorFn],
        city: [address.city, requiredValidatorFn],
        street: [address.street, requiredValidatorFn],
        house: [address.house, requiredValidatorFn],
        building: address.building,
        subBuilding: address.subBuilding,
        flat: address.flat,
    });
  }

  private ourRequiredValidatorFn(control: AbstractControl) {
    if (this.livingAddressRequired) {
      return Validators.required(control);
    } else {
      return null;
    }
  }

  ngOnInit(): void {

    let that = this;

    this.form = this.fb.group({
      registrationAddress: this.addressFormGroup(this.model.registrationAddress, Validators.required),
      livingAddress: this.addressFormGroup(this.model.livingAddress, control => {
        return that.ourRequiredValidatorFn(control);
      }),
      email: this.model.email,
      verificationCode: this.model.verificationCode,
    });
  }

  ngAfterViewInit(): void {

    let livingAddressFormGroup = <FormGroup>this.form.get('livingAddress');

    // console.log(`====================================================================`);
    // console.log(`this.addressFormGroupEmptyCheckers.forEach(...`);

    let that = this;

    this.addressFormGroupEmptyCheckers.forEach(addressFormGroupEmptyChecker => {

      // console.log(`addressFormGroupEmptyChecker.name = ${addressFormGroupEmptyChecker.name}`);

      if (addressFormGroupEmptyChecker.controlContainer.name === 'livingAddress') {
        addressFormGroupEmptyChecker.emptyChecker.emptyStateChanges.subscribe(allAddressFieldsEmpty => {

          // console.log(`allAddressFieldsEmpty = ${allAddressFieldsEmpty}`);

          that.livingAddressRequired = !allAddressFieldsEmpty;

          let controls = livingAddressFormGroup.controls;

          Object.keys(controls).forEach(key => controls[key].updateValueAndValidity({onlySelf: false, emitEvent: true}));
        });
      }
   });
  }

  verifyOnClick() {

    let emailControl: FormControl = <FormControl>this.form.get('email');
    let verificationCodeControl: FormControl = <FormControl>this.form.get('verificationCode');

    if (!emailControl.valid) {
      this.modalService.warning('Необходимо ввести корректный адрес электронной почты');
      return;
    }

    if (this.verificationCodeTimerSubscription) {
      this.verificationCodeTimerSubscription.unsubscribe();
    }

    let email = emailControl.value;

    let that = this;

    this.ourServerApi.sendPhoneNumberVerificationCode(email).take(1).subscribe(() => {

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

      let step = new RegistrationStep2();

      let formValue = this.form.value;

      Object.keys(formValue).forEach(key => {

        let value = formValue[key];

        step[key] = value;
      });

      console.log(JSON.stringify(step));

      this.ourServerApi.submitRegistrationStep2(step).subscribe(
        () => {
          console.log('OK');
          this.router.navigate(['reg3']);
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

export class Address {
  region = '';
  city = '';
  street = '';
  house = '';
  building = '';
  subBuilding = '';
  flat = '';
}

export class RegistrationStep2 {
  registrationAddress = new Address;
  livingAddress = new Address;
  email = '';
  verificationCode = '';
}
