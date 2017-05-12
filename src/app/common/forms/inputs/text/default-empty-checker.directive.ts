import {Directive, ElementRef, forwardRef, Optional} from '@angular/core';
import {AbstractEmptyCheckerDirective} from '../../empty-checker/abstract-empty-checker.directive';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'input[type="text"]:not([textMask]):not([app-date]):not([app-phone])',
  providers: [
    {provide: AbstractEmptyCheckerDirective, useExisting: forwardRef(() => DefaultEmptyCheckerDirective)}
  ]
})
export class DefaultEmptyCheckerDirective extends AbstractEmptyCheckerDirective {

  constructor(hostElementRef: ElementRef, @Optional() ngControl: NgControl) {
    super(hostElementRef, ngControl);
  }

  protected isElementValueEmpty(element: any) {
    return element.value === '' || element.value === undefined;
  }

  protected get name() {
    return 'DefaultEmptyCheckerDirective';
  };
}
