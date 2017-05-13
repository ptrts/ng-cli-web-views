import {Component, Directive, forwardRef, Inject, InjectionToken, NgModule, OnInit, Optional} from '@angular/core';
import {NgControl} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ValidationMessageService} from '../validation-message.service';
import {AbstractEmptyCheckerWorker} from '../../empty-checker/abstract-empty-checker-worker.directive';

export interface ValidationMessages {
  [key: string]: string;
}

export interface ValidationMessagesProvider {
  getMessages(formControlName: string): ValidationMessages;
}

export interface ControlsAggregator {
  addControl(ngControl: NgControl, emptyChecker: AbstractEmptyCheckerWorker);
}

export const APP_VALIDATION_MESSAGES_PROVIDER
  = new InjectionToken<ValidationMessagesProvider>('APP_VALIDATION_MESSAGES_PROVIDER');

export const APP_CONTROLS_AGGREGATOR
  = new InjectionToken<ValidationMessagesProvider>('APP_CONTROLS_AGGREGATOR');

@Directive({
  selector: '.form-group',
  providers: [
    {
      provide: APP_CONTROLS_AGGREGATOR,
      useExisting: forwardRef(() => BootstrapFormGroupDirective)
    }
  ]
})
export class BootstrapFormGroupDirective implements ControlsAggregator {

  ngControl: NgControl;
  emptyChecker: AbstractEmptyCheckerWorker;

  addControl(ngControl: NgControl, emptyChecker: AbstractEmptyCheckerWorker) {
    this.ngControl = ngControl;
    this.emptyChecker = emptyChecker;
  }
}

@Directive({
  selector: '[ngModel],[formControlName],[formGroup],[formGroupName]'
})
export class ControlSpy implements OnInit {

  constructor(private ngControl: NgControl,
              @Optional() private emptyChecker: AbstractEmptyCheckerWorker,
              @Optional() @Inject(APP_CONTROLS_AGGREGATOR) private controlsAggregator: ControlsAggregator) {
  }

  ngOnInit(): void {
    if (this.controlsAggregator != null) {
      this.controlsAggregator.addControl(this.ngControl, this.emptyChecker);
    }
  }
}

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  messagesConfiguration: {
    [key: string]: string
  };

  ngControl: NgControl;
  emptyChecker: AbstractEmptyCheckerWorker;

  constructor(public validationMessageService: ValidationMessageService,
              @Inject(APP_VALIDATION_MESSAGES_PROVIDER) private validationMessagesProvider: ValidationMessagesProvider,
              private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit() {
    this.ngControl = this.bootstrapFormGroupDirective.ngControl;
    this.emptyChecker = this.bootstrapFormGroupDirective.emptyChecker;
    this.messagesConfiguration = this.validationMessagesProvider.getMessages(this.ngControl.name);
  }

  get show() {
    let c = this.ngControl;
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
    ControlSpy,
    ValidationMessageComponent
  ],
  providers: [
    ValidationMessageService
  ],
  exports: [
    BootstrapFormGroupDirective,
    ControlSpy,
    ValidationMessageComponent
  ]
})
export class ValidationMessageComponentModule {
}
