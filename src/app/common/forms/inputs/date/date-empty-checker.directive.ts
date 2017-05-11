import {Directive, ElementRef, forwardRef, Optional} from '@angular/core';
import {DateTextMaskService} from './date-text-mask.service';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'input[type="text"][app-date][textMask]',
  providers: [
    {provide: AbstractEmptyCheckerDirective, useExisting: forwardRef(() => DateEmptyCheckerDirective)}
  ]
})
export class DateEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef, @Optional() ngControl: NgControl, private dateTextMaskService: DateTextMaskService) {
    super(hostElementRef, ngControl);
  }

  protected isElementValueEmpty(element: any) {
    return this.dateTextMaskService.isEmpty(element.value);
  }
}
