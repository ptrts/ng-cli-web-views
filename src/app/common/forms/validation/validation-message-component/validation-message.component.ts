import {Component, Directive, Inject, InjectionToken, NgModule, OnInit, Optional} from '@angular/core';
import {FormControl, FormControlName, NgModel} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ValidationMessageService} from '../validation-message.service';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';

export interface ValidationMessages {
  [key: string]: string;
}

export interface ValidationMessagesProvider {
  getMessages(formControlName: string): ValidationMessages;
}

export const APP_VALIDATION_MESSAGES_PROVIDER = new InjectionToken<ValidationMessagesProvider>('APP_VALIDATION_MESSAGES_PROVIDER');

@Directive({
  selector: '.form-group'
})
export class BootstrapFormGroupDirective {
  formControlName: string;
  formControl: FormControl;
  emptyChecker: AbstractEmptyCheckerDirective;
}

@Directive({
  selector: '[ngModel],[formControlName]'
})
export class SpyFormControlNameDirective implements OnInit {

  constructor(@Optional() private ngModel: NgModel,
              @Optional() private formControlName: FormControlName,
              @Optional() private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit(): void {

    let formControlName: string;
    let formControl: FormControl;

    if (this.ngModel != null) {
      formControlName = this.ngModel.name;
      formControl = this.ngModel.control;
    } else if (this.formControlName != null) {
      formControlName = this.formControlName.name;
      formControl = this.formControlName.control;
    } else {
      throw new Error('Что-то не так. Если мы здесь, то либо ngModel, либо formControlName должно быть не null');
    }

    if (this.bootstrapFormGroupDirective != null) {
      this.bootstrapFormGroupDirective.formControlName = formControlName;
      this.bootstrapFormGroupDirective.formControl = formControl;
    }
  }
}

@Directive({
  selector: 'input[type="text"]'
})
export class SpyEmptyCheckerDirective implements OnInit {

  constructor(@Optional() private emptyChecker: AbstractEmptyCheckerDirective,
              @Optional() private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit(): void {
    if (this.bootstrapFormGroupDirective !== null) {
      this.bootstrapFormGroupDirective.emptyChecker = this.emptyChecker;
    }
  }
}

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  messages: {
    [key: string]: string
  };

  formControlName: string;
  formControl: FormControl;
  emptyChecker: AbstractEmptyCheckerDirective;

  constructor(public validationMessageService: ValidationMessageService,
              @Inject(APP_VALIDATION_MESSAGES_PROVIDER) private validationMessagesProvider: ValidationMessagesProvider,
              private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit() {
    this.formControlName = this.bootstrapFormGroupDirective.formControlName;
    this.formControl = this.bootstrapFormGroupDirective.formControl;
    this.emptyChecker = this.bootstrapFormGroupDirective.emptyChecker;
    this.messages = this.validationMessagesProvider.getMessages(this.formControlName);
  }
}

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    BootstrapFormGroupDirective,
    SpyFormControlNameDirective,
    SpyEmptyCheckerDirective,
    ValidationMessageComponent
  ],
  exports: [
    BootstrapFormGroupDirective,
    SpyFormControlNameDirective,
    SpyEmptyCheckerDirective,
    ValidationMessageComponent
  ]
})
export class ValidationMessageComponentModule {
}
