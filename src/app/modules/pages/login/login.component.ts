import {Component, forwardRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OurServerApi} from '../../../server/our-server-api';
import {Router} from '@angular/router';
import {ModalService} from '../../global-services/modal/modal.service';
import {
  APP_VALIDATION_MESSAGES_PROVIDER, ValidationMessages,
  ValidationMessagesProvider
} from '../../page-elements/validation-message-component/validation-message.component';
import {PhoneTextMaskService} from '../../page-elements/text-mask/phone/phone-text-mask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [
    {
      provide: APP_VALIDATION_MESSAGES_PROVIDER,
      useExisting: forwardRef(() => LoginComponent)
    }
  ]
})
export class LoginComponent implements OnInit, ValidationMessagesProvider {

  form: FormGroup;

  private validationMessages = {
    password: {
      required: 'Пароль не указан',
      pattern: 'Пароль содержит русские символы'
    }
  };

  constructor(public phoneTextMaskService: PhoneTextMaskService,
              private fb: FormBuilder,
              private ourServerApi: OurServerApi,
              private router: Router,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      phoneNumber: this.phoneTextMaskService.toInputValue(''),
      password: ''
    });
  }

  loginOnClick() {

    if (this.form.invalid) {

      Object.keys(this.form.controls).forEach(formControlName => {
        let control = this.form.controls[formControlName];
        control.markAsTouched();
        control.updateValueAndValidity({onlySelf: false, emitEvent: true});
      }, this);

      this.modalService.warning(`
        При заполнении формы были допущены ошибки.
        Обратите внимание на пояснения красным цветом под полями формы.
      `);
    } else {

      let model = new PhoneNumberPassword();

      let phoneNumberControl = this.form.get('phoneNumber');
      model.phoneNumber = this.phoneTextMaskService.fromInputValue(phoneNumberControl.value);

      let passwordControl = this.form.get('password');
      model.password = passwordControl.value;

      this.ourServerApi.submitLogin(model).subscribe(
        () => this.router.navigate(['/profile']),
        error => this.modalService.warning(error)
      );
    }
  }

  getMessages(formControlName: string): ValidationMessages {
    return this.validationMessages[formControlName];
  }
}

export class PhoneNumberPassword {
  phoneNumber: string = '';
  password: string = '';
}
