import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: 'app-checkbox[required]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AppCheckboxRequiredValidator),
      multi: true
    },
  ]
})
export class AppCheckboxRequiredValidator implements Validator {

  constructor() {}

  validate(c: AbstractControl): ValidationErrors | any {

    if (c.value !== true) {
      return {required: true};
    }

    return null;
  }
}
