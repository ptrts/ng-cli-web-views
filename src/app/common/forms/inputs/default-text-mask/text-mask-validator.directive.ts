import {Directive, forwardRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {DefaultTextMaskService} from './text-mask.service';

@Directive({
  selector: 'input[type="text"][textMask]:not([app-date]):not([app-phone])',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DefaultTextMaskValidatorDirective),
      multi: true
    }
  ]
})
export class DefaultTextMaskValidatorDirective implements Validator {

  @Input('required')
  required: string;

  @Input('textMask')
  textMaskConf: any;

  constructor(private defaultTextMaskService: DefaultTextMaskService) {
  }

  validate(c: AbstractControl): ValidationErrors {

    const inputValue: string = c.value;

    if (this.defaultTextMaskService.isEmpty(inputValue, this.textMaskConf)) {

      if (this.required !== undefined) {
        return {textMaskEmpty: 'Поле не заполнено'};
      }

    } else {

      if (inputValue.match(/_/)) {
        return {textMaskIncomplete: 'Поле заполнено не полностью'};
      }
    }

    return null;
  }
}