import {Directive, forwardRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {DefaultTextMaskService} from './default-text-mask.service';

@Directive({
  selector: 'input[type="text"][textMask]:not([appDate]):not([appPhone])',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DefaultTextMaskValidator),
      multi: true
    }
  ]
})
export class DefaultTextMaskValidator implements Validator {

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
        return {required: 'Поле не заполнено'};
      }

    } else {

      if (inputValue.match(/_/)) {
        return {textMaskIncomplete: 'Поле заполнено не полностью'};
      }
    }

    return null;
  }
}
