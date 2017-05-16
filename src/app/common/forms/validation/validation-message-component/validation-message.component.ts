import {
  Component,
  Directive, ElementRef,
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
  registerControl(elementRef: ElementRef, controlDirective: AbstractControlDirective, emptyChecker: AbstractEmptyChecker, name: string);
}

export const APP_VALIDATION_MESSAGES_PROVIDER
  = new InjectionToken<ValidationMessagesProvider>('APP_VALIDATION_MESSAGES_PROVIDER');

export const APP_CONTROLS_AGGREGATOR
  = new InjectionToken<ControlsAggregator>('APP_CONTROLS_AGGREGATOR');

class ControlInfo {
  elementRef: ElementRef;
  name: string;
  controlDirective: AbstractControlDirective;
  emptyChecker: AbstractEmptyChecker;
}

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

  controlInfos: ControlInfo[] = [];

  registerControl(elementRef: ElementRef, controlDirective: AbstractControlDirective, emptyChecker: AbstractEmptyChecker, name: string) {
    this.controlInfos.push({
      elementRef: elementRef,
      name: name,
      controlDirective: controlDirective,
      emptyChecker: emptyChecker
    });
  }
}

@Directive({
  selector: '[ngForm],[formGroup],[formGroupName]',
  providers: [
    {
      provide: APP_CONTROLS_AGGREGATOR,
      useExisting: forwardRef(() => ControlContainerSpy)
    }
  ]
})
export class ControlContainerSpy implements ControlsAggregator {
  registerControl(elementRef: ElementRef, controlDirective: AbstractControlDirective, emptyChecker: AbstractEmptyChecker, name: string) {
    // Перехватываем деток, желающих зарегистрироваться в бутстраповском class="form-group"
    // Мы сами там зарегистрируемся от имени их всех
  }
}

@Directive({
  selector: '[ngModel],[formControl],[formControlName],[formGroup],[formGroupName]'
})
export class ControlSpy implements OnInit {

  constructor(private elementRef: ElementRef,
              @Optional() @Self() private ngControl: NgControl,
              @Optional() @Self() private controlContainer: ControlContainer,
              @Optional() @Self() private emptyChecker: AbstractEmptyChecker,
              @Optional() @Inject(APP_CONTROLS_AGGREGATOR) @SkipSelf() private controlsAggregator: ControlsAggregator) {
  }

  ngOnInit(): void {
    if (this.controlsAggregator != null) {
      if (this.ngControl) {
        this.controlsAggregator.registerControl(this. elementRef, this.ngControl, this.emptyChecker, this.ngControl.name);
      } else if (this.controlContainer) {
        this.controlsAggregator.registerControl(this. elementRef, this.controlContainer, this.emptyChecker, this.controlContainer.name);
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

  show = false;

  controlInfos: Array<ControlInfo>;

  constructor(@Inject(APP_VALIDATION_MESSAGES_PROVIDER) private validationMessagesProvider: ValidationMessagesProvider,
              private bootstrapFormGroupDirective: BootstrapFormGroupDirective) {
  }

  ngOnInit() {

    // console.log('ValidationMessageComponent.ngOnInit');

    this.controlInfos = this.bootstrapFormGroupDirective.controlInfos;

    // Привязываемся к событиям всех наших контролов
    // По событию будем вычислять агрегированные статусы, и из них потом - флажок, показывать сообщения или не показывать
    if (this.controlInfos) {

      let that = this;

      this.controlInfos.forEach(controlInfo => {

        // console.log(`controlInfo.name = ${controlInfo.name}`);

        if (controlInfo.emptyChecker) {
          controlInfo.emptyChecker.emptyStateChanges.subscribe(() => that.refreshShow());
        }
        controlInfo.controlDirective.statusChanges.subscribe(() => that.refreshShow());
        controlInfo.elementRef.nativeElement.addEventListener('blur', () => that.refreshShow());
      });
    }
  }

  refreshShow() {

    let invalid = false;
    let touched = false;
    let dirty = false;

    let notEmpty = false;

    // console.log('this.controlInfos.forEach(controlInfo => {...');

    this.controlInfos.forEach(controlInfo => {

      // console.log(`--------------------------------------------------`);
      // console.log(`controlInfo.name = ${controlInfo.name}`);
      // console.log(`controlInfo.controlDirective.invalid = ${controlInfo.controlDirective.invalid}`);
      // console.log(`controlInfo.controlDirective.touched = ${controlInfo.controlDirective.touched}`);
      // console.log(`controlInfo.controlDirective.dirty = ${controlInfo.controlDirective.dirty}`);
      // console.log(`controlInfo.emptyChecker = ${controlInfo.emptyChecker}`);
      // console.log(`controlInfo.emptyChecker.notEmpty = ${controlInfo.emptyChecker && controlInfo.emptyChecker.notEmpty}`);

      invalid = invalid || controlInfo.controlDirective.invalid;
      touched = touched || controlInfo.controlDirective.touched;
      dirty = dirty || controlInfo.controlDirective.dirty;

      notEmpty = notEmpty || (!controlInfo.emptyChecker || controlInfo.emptyChecker.notEmpty);
    });

    this.show = invalid && (touched || dirty || notEmpty);

    // console.log(`show = ${this.show}`);
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

    this.controlInfos.forEach(controlInfo => {

      let control = controlInfo.controlDirective.control;

      let name = controlInfo.name;

      this.addControlErrorsRecursively(validationErrorsByFields, control, name);
    });

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
    ControlContainerSpy,
    ControlSpy,
    ValidationMessageComponent
  ],
  exports: [
    BootstrapFormGroupDirective,
    ControlContainerSpy,
    ControlSpy,
    ValidationMessageComponent
  ]
})
export class ValidationMessageComponentModule {
}
