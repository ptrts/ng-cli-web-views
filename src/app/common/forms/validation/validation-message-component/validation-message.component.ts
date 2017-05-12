import {Component, Directive, Inject, InjectionToken, NgModule, OnInit, Optional} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {ValidationMessageService} from '../validation-message.service';

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
  controlName: string;
  control: AbstractControl;
  emptyChecker: AbstractEmptyCheckerDirective;
}

@Directive({
  selector: '[ngModel],[formControlName]'
})
export class SpyControlDirective implements OnInit {

  constructor(private ngControl: NgControl,
              @Optional() private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit(): void {
    if (this.bootstrapFormGroupDirective != null) {
      this.bootstrapFormGroupDirective.controlName = this.ngControl.name;
      this.bootstrapFormGroupDirective.control = this.ngControl.control;
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

  controlName: string;
  control: AbstractControl;
  emptyChecker: AbstractEmptyCheckerDirective;

  constructor(public validationMessageService: ValidationMessageService,
              @Inject(APP_VALIDATION_MESSAGES_PROVIDER) private validationMessagesProvider: ValidationMessagesProvider,
              private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit() {
    this.controlName = this.bootstrapFormGroupDirective.controlName;
    this.control = this.bootstrapFormGroupDirective.control;
    this.emptyChecker = this.bootstrapFormGroupDirective.emptyChecker;
    this.messages = this.validationMessagesProvider.getMessages(this.controlName);
  }

  get show() {
    let c = this.control;
    return c.invalid && (
        c.touched ||
        c.dirty ||
        this.emptyChecker && this.emptyChecker.notEmpty
      );
  }
}

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    BootstrapFormGroupDirective,
    SpyControlDirective,
    SpyEmptyCheckerDirective,
    ValidationMessageComponent
  ],
  providers: [
    ValidationMessageService
  ],
  exports: [
    BootstrapFormGroupDirective,
    SpyControlDirective,
    SpyEmptyCheckerDirective,
    ValidationMessageComponent
  ]
})
export class ValidationMessageComponentModule {
}
