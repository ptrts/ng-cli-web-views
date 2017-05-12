import {Directive, ElementRef, forwardRef, Optional} from '@angular/core';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {PhoneTextMaskService} from './phone-text-mask.service';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'input[type="text"][app-phone][textMask]',
  providers: [
    {provide: AbstractEmptyCheckerDirective, useExisting: forwardRef(() => PhoneEmptyCheckerDirective)}
  ]
})
export class PhoneEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef, @Optional() ngControl: NgControl, private phoneTextMaskService: PhoneTextMaskService) {
    super(hostElementRef, ngControl);
    console.log('PhoneEmptyCheckerDirective.constructor, name = ' + ngControl.name);
  }

  protected isElementValueEmpty(element: any) {
    return this.phoneTextMaskService.isEmpty(element.value);
  }

  protected get name() {
    return 'PhoneEmptyCheckerDirective';
  };
}
