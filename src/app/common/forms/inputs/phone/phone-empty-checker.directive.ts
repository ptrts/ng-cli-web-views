import {Directive, ElementRef, forwardRef} from '@angular/core';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {PhoneTextMaskService} from './phone-text-mask.service';

@Directive({
  selector: 'input[type="text"][app-phone][textMask]',
  providers: [
    {provide: AbstractEmptyCheckerDirective, useExisting: forwardRef(() => PhoneEmptyCheckerDirective)}
  ]
})
export class PhoneEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef, private phoneTextMaskService: PhoneTextMaskService) {
    super(hostElementRef);
  }

  protected isElementValueEmpty(element: any) {
    return this.phoneTextMaskService.isEmpty(element.value);
  }
}
