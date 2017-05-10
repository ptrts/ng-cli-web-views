import {Directive, ElementRef} from '@angular/core';
import {DateTextMaskService} from './date-text-mask.service';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';

@Directive({
  selector: 'input[type="text"][app-date][textMask]'
})
export class DateEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef, private dateTextMaskService: DateTextMaskService) {
    super(hostElementRef);
  }

  protected isElementValueEmpty(element: any) {
    return this.dateTextMaskService.isEmpty(element.value);
  }
}
