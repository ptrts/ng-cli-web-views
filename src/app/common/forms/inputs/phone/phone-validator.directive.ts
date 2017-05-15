import {Directive, forwardRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {PhoneTextMaskService} from './phone-text-mask.service';

@Directive({
  selector: 'input[type="text"][appPhone][textMask]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneValidator),
      multi: true
    }
  ]
})
export class PhoneValidator implements Validator {

  @Input('required')
  required: string;

  constructor(private phoneTextMaskService: PhoneTextMaskService) {
  }

  validate(c: AbstractControl): ValidationErrors {

    const inputValue: string = c.value;

    if (this.phoneTextMaskService.isEmpty(inputValue)) {

      if (this.required !== undefined) {
        return {phoneEmpty: 'Телефон должен быть заполнен'};
      }

    } else {

      if (inputValue.charAt(1).match(/[0-8]/)) {
        return {phoneFirstCharacter: 'Первая цифра должна быть 9'};
      }

      if (inputValue.match(/_/)) {
        return {phoneIncomplete: 'Номер телефона заполнен не полностью'};
      }
    }

    return null;
  }
}
