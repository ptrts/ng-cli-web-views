import {Directive, ElementRef} from '@angular/core';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {PhoneTextMaskService} from './phone-text-mask.service';

@Directive({
  selector: 'input[type="text"][app-phone][textMask]'
})
export class PhoneEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef, private phoneTextMaskService: PhoneTextMaskService) {
    super(hostElementRef);
  }

  protected isElementValueEmpty(element: any) {
    return this.phoneTextMaskService.isEmpty(element.value);
  }
}
