import {
  Component,
  Directive,
  forwardRef,
  Inject,
  InjectionToken,
  NgModule,
  OnInit,
  Optional,
  Self,
  SkipSelf
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  ControlContainer,
  FormArray,
  FormGroup,
  NgControl,
  ValidationErrors
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AbstractEmptyChecker} from '../../empty-checker/abstract-empty-checker';

export interface ValidationMessages {
  [key: string]: string;
}

export interface ValidationMessagesProvider {
  getMessages(formControlName: string): ValidationMessages;
}

export interface ControlsAggregator {
  registerControl(controlDirective: AbstractControlDirective, emptyChecker: AbstractEmptyChecker, name: string);
}

export const APP_VALIDATION_MESSAGES_PROVIDER
  = new InjectionToken<ValidationMessagesProvider>('APP_VALIDATION_MESSAGES_PROVIDER');

export const APP_CONTROLS_AGGREGATOR
  = new InjectionToken<ControlsAggregator>('APP_CONTROLS_AGGREGATOR');

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

  controlDirective: AbstractControlDirective;
  emptyChecker: AbstractEmptyChecker;
  name: string;

  registerControl(controlDirective: AbstractControlDirective, emptyChecker: AbstractEmptyChecker, name: string) {
    this.controlDirective = controlDirective;
    this.emptyChecker = emptyChecker;
    this.name = name;
  }
}

@Directive({
  selector: '[ngModel],[formControl],[formControlName],[formGroup],[formGroupName]'
})
export class ControlSpy implements OnInit {

  constructor(@Optional() @Self() private ngControl: NgControl,
              @Optional() @Self() private controlContainer: ControlContainer,
              @Optional() @Self() private emptyChecker: AbstractEmptyChecker,
              @Optional() @Inject(APP_CONTROLS_AGGREGATOR) @SkipSelf() private controlsAggregator: ControlsAggregator) {
  }

  ngOnInit(): void {
    if (this.controlsAggregator != null) {
      if (this.ngControl) {
        this.controlsAggregator.registerControl(this.ngControl, this.emptyChecker, this.ngControl.name);
      } else if (this.controlContainer) {
        this.controlsAggregator.registerControl(this.controlContainer, this.emptyChecker, this.controlContainer.name);
      } else {
        throw new Error('Что-то не так. Должно было заинжектиться либо NgControl, либо ControlContainer');
      }
    }
  }
}

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  JSON = JSON;

  controlDirective: AbstractControlDirective;
  emptyChecker: AbstractEmptyChecker;
  name: string;

  constructor(@Inject(APP_VALIDATION_MESSAGES_PROVIDER) private validationMessagesProvider: ValidationMessagesProvider,
              private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit() {
    this.controlDirective = this.bootstrapFormGroupDirective.controlDirective;
    this.emptyChecker = this.bootstrapFormGroupDirective.emptyChecker;
    this.name = this.bootstrapFormGroupDirective.name;
  }

  get show() {
    let c = this.controlDirective;
    return c.invalid && (
        c.touched ||
        c.dirty ||
        this.emptyChecker && this.emptyChecker.notEmpty
      );
  }

  private addControlErrorsRecursively(validationErrorsByFields: {[formField: string]: ValidationErrors},
                                      control: AbstractControl,
                                      name: string) {

    if (control.errors) {
      validationErrorsByFields[name] = control.errors;
    }

    if (control instanceof FormGroup) {

      Object.keys(control.controls).forEach(key => {
        let childControl = control.controls[key];
        this.addControlErrorsRecursively(validationErrorsByFields, childControl, key);
      });

    } else if (control instanceof FormArray) {
      throw new Error('Сообщения валидации для FormArray пока не реализованы');
    }
  }

  buildMessages(): string[] {

    let validationErrorsByFields: {[formField: string]: ValidationErrors} = {};

    let control: AbstractControl = this.controlDirective.control;

    let name = this.name;

    this.addControlErrorsRecursively(validationErrorsByFields, control, name);

    let messageArrays = Object.keys(validationErrorsByFields).map(controlName => {

      let controlValidationErrors: ValidationErrors = validationErrorsByFields[controlName];

      let controlMessages = this.buildControlVeryMessages(controlName, controlValidationErrors);

      return controlMessages;

    });

    let messages = [].concat.apply([], messageArrays);

    return messages;
  }

  private buildControlVeryMessages(controlName: string, controlErrors: ValidationErrors): string[] {

    let controlMessagesConfiguration = this.validationMessagesProvider.getMessages(controlName);

    let errorKeys = Object.getOwnPropertyNames(controlErrors);

    return errorKeys.map(errorKey => {

      let message = controlMessagesConfiguration && controlMessagesConfiguration[errorKey];

      if (message) {
        return message;
      } else {
        let errorParameters = controlErrors[errorKey];
        if (typeof errorParameters === 'string') {
          return errorParameters;
        }
        return `Нарушено правило валидации ${errorKey}`;
      }
    });
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
  exports: [
    BootstrapFormGroupDirective,
    ControlSpy,
    ValidationMessageComponent
  ]
})
export class ValidationMessageComponentModule {
}
